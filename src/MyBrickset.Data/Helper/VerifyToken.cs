/*
 * Copyright Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

using Google.Apis.Oauth2.v2;
using Google.Apis.Oauth2.v2.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;

namespace MyBrickset.Data.Helper
{
    /// <summary>
    ///  This is a minimal implementation of OAuth V2 verification that
    ///  demonstrates:
    ///    - ID Token validation
    ///    - Access token validation
    /// </summary>
    /// @author class@google.com (Gus Class)
    public class VerifyToken: IVerifyToken
    {
        // Get this from your app at https://code.google.com/apis/console
        static public string CLIENT_ID = "YOUR_VALID_CLIENT_ID";

        // Values returned in the response
        private access_token_status ats = new access_token_status();

        private id_token_status its = new id_token_status();

        /// <summary>
        /// Processes the request based on the path.
        /// </summary>
        /// <param name="context">Contains the request and response.</param>
        public async Task<bool> Verify(string idToken, string accessToken)
        {
            // Validate the ID token
            if (idToken != null)
            {
                JwtSecurityToken token = new JwtSecurityToken(idToken);
                JwtSecurityTokenHandler jwtHandler = new JwtSecurityTokenHandler();

                // Configure validation
                Byte[][] certBytes =await getCertBytes();
                Dictionary<String, X509Certificate2> certificates = new Dictionary<String, X509Certificate2>();

                for (int i = 0; i < certBytes.Length; i++)
                {
                    X509Certificate2 certificate = new X509Certificate2(certBytes[i]);
                    certificates.Add(certificate.Thumbprint, certificate);
                }
                {
                    // Set up token validation
                    TokenValidationParameters tvp = new TokenValidationParameters()
                    {
                        ValidateActor = false, // check the profile ID

                        ValidateAudience = (CLIENT_ID != "YOUR_VALID_CLIENT_ID"), // check the client ID
                        ValidAudience = CLIENT_ID,

                        ValidateIssuer = true, // check token came from Google
                        ValidIssuers = new List<string> { "accounts.google.com", "https://accounts.google.com" },

                        ValidateIssuerSigningKey = true,
                        RequireSignedTokens = true,
                        //CertificateValidator = X509CertificateValidator.None,
                        IssuerSigningKeyResolver = (s, securityToken, identifier, parameters) => new List<X509SecurityKey> { new X509SecurityKey(certificates[identifier.ToUpper()]) },
                        
                        ValidateLifetime = true,
                        RequireExpirationTime = true,
                        ClockSkew = TimeSpan.FromHours(13)
                    };

                    try
                    {
                        // Validate using the provider
                        SecurityToken validatedToken;
                        ClaimsPrincipal cp = jwtHandler.ValidateToken(idToken, tvp, out validatedToken);
                        if (cp != null)
                        {
                            its.valid = true;
                            its.message = "Valid ID Token.";
                            //return true;
                        }
                    }
                    catch (Exception e)
                    {
                        // Multiple certificates are tested.
                        if (its.valid != true)
                        {
                            its.message = "Invalid ID Token.";
                            return false;
                        }
                        if (e.Message.IndexOf("The token is expired") > 0)
                        {
                            // TODO: Check current time in the exception for clock skew.
                        }
                    }
                }

                // Get the Google+ id for this user from the "sub" claim.
                Claim[] claims = token.Claims.ToArray<Claim>();
                for (int i = 0; i < claims.Length; i++)
                {
                    if (claims[i].Type.Equals("sub"))
                    {
                        its.gplus_id = claims[i].Value;
                    }
                }
            }

            // Use Tokeninfo to validate the user and the client.
            var tokeninfo_request = new Oauth2Service().Tokeninfo();
            tokeninfo_request.AccessToken = accessToken;

            // Use Google as a trusted provider to validate the token.
            // Invalid values, including expired tokens, return 400
            Tokeninfo tokeninfo = null;
            try
            {
                tokeninfo = tokeninfo_request.Execute();
                if (tokeninfo.IssuedTo != CLIENT_ID)
                {
                    ats.message = "Access Token not meant for this app.";
                }
                else
                {
                    ats.valid = true;
                    ats.message = "Valid Access Token.";
                    ats.gplus_id = tokeninfo.UserId;
                }
            }
            catch (Exception stve)
            {
                ats.message = "Invalid Access Token: " + stve.Message;
            }

            // Use the wrapper to return JSON
            token_status_wrapper tsr = new token_status_wrapper();
            tsr.id_token_status = its;
            tsr.access_token_status = ats;

            return true;
        }

        // Used for string parsing the Certificates from Google
        private const string beginCert = "-----BEGIN CERTIFICATE-----\\n";

        private const string endCert = "\\n-----END CERTIFICATE-----\\n";

        /// <summary>
        /// Retrieves the certificates for Google and returns them as byte arrays.
        /// </summary>
        /// <returns>An array of byte arrays representing the Google certificates.</returns>
        public async Task<byte[][]> getCertBytes()
        {
            // The request will be made to the authentication server.
            WebRequest request = WebRequest.Create(
                "https://www.googleapis.com/oauth2/v1/certs"
            );

            StreamReader reader = new StreamReader((await request.GetResponseAsync()).GetResponseStream());

            string responseFromServer = reader.ReadToEnd();

            String[] split = responseFromServer.Split(':');

            // There are n number of certificates returned from Google
            int numberOfCerts = (split.Length - 1) <= 1 ? 1 : split.Length - 1;
            byte[][] certBytes = new byte[numberOfCerts][];
            int index = 0;
            UTF8Encoding utf8 = new UTF8Encoding();
            for (int i = 0; i < split.Length; i++)
            {
                if (split[i].IndexOf(beginCert) > 0)
                {
                    int startSub = split[i].IndexOf(beginCert);
                    int endSub = split[i].IndexOf(endCert) + endCert.Length;
                    certBytes[index] = utf8.GetBytes(split[i].Substring(startSub, endSub).Replace("\\n", "\n"));
                    index++;
                }
            }
            return certBytes;
        }

        /// <summary>
        /// Stores the result data for the ID token verification.
        /// </summary>
        private class id_token_status
        {
            public Boolean valid = false;
            public String gplus_id = null;
            public String message = "";
        }

        /// <summary>
        /// Stores the result data for the access token verification.
        /// </summary>
        private class access_token_status
        {
            public Boolean valid = false;
            public String gplus_id = null;
            public String message = "";
        }

        /// <summary>
        /// Stores the result data for both token status responses.
        /// </summary>
        private class token_status_wrapper
        {
            public id_token_status id_token_status = null;
            public access_token_status access_token_status = null;
        }
    }
}

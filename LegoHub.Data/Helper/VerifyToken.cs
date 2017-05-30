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
using Microsoft.Extensions.Options;
using LegoHub.Data.Config;
using LegoHub.Data.Models.Auth;

namespace LegoHub.Data.Helper
{
    /// <summary>
    ///  This is a minimal implementation of OAuth V2 verification that
    ///  demonstrates:
    ///    - ID Token validation
    ///    - Access token validation
    /// </summary>
    /// @author class@google.com (Gus Class)
    public class VerifyToken : IVerifyToken
    {
        private AppConfig _config;
        public VerifyToken(IOptions<AppConfig> config)
        {
            _config = config.Value;
        }
        /// <summary>
        /// Processes the request based on the path.
        /// </summary>
        /// <param name="context">Contains the request and response.</param>
        public async Task<TokenStatusWrapper> Verify(string idToken, string accessToken)
        {
            // Values returned in the response
            AccessTokenStatus ats = new AccessTokenStatus();

            IDTokenStatus its = new IDTokenStatus();

            // Validate the ID token
            if (idToken != null)
            {
                JwtSecurityToken token = new JwtSecurityToken(idToken);
                JwtSecurityTokenHandler jwtHandler = new JwtSecurityTokenHandler();

                // Configure validation
                Byte[][] certBytes = await getCertBytes();
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

                        ValidateAudience = true, // check the client ID
                        ValidAudience = _config.GoogleClientID,

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
                            its.Valid = true;
                            its.Message = "Valid ID Token.";
                        }
                    }
                    catch (Exception e)
                    {
                        // Multiple certificates are tested.
                        if (its.Valid != true)
                        {
                            its.Message = "Invalid ID Token.";
                        }
                        if (e.Message.IndexOf("The token is expired") > 0)
                        {
                            // TODO: Check current time in the exception for clock skew.
                            its.Message = "The Token is expired.";
                        }
                    }
                }

                // Get the Google+ id for this user from the "sub" claim.
                Claim[] claims = token.Claims.ToArray<Claim>();
                for (int i = 0; i < claims.Length; i++)
                {
                    if (claims[i].Type.Equals("sub"))
                    {
                        its.GPlusID = claims[i].Value;
                    }
                }
            }

            // Use Tokeninfo to validate the user and the client.
            var tokenInfoRequest = new Oauth2Service().Tokeninfo();
            tokenInfoRequest.AccessToken = accessToken;

            // Use Google as a trusted provider to validate the token.
            // Invalid values, including expired tokens, return 400
            Tokeninfo tokenInfo = null;
            try
            {
                tokenInfo = tokenInfoRequest.Execute();
                if (tokenInfo.IssuedTo != _config.GoogleClientID)
                {
                    ats.Message = "Access Token not meant for this app.";
                }
                else
                {
                    ats.Valid = true;
                    ats.Message = "Valid Access Token.";
                    ats.GPlusID = tokenInfo.UserId;
                }
            }
            catch (Exception stve)
            {
                ats.Message = "Invalid Access Token: " + stve.Message;
            }

            // Use the wrapper to return JSON
            TokenStatusWrapper result = new TokenStatusWrapper{
                IdTokenStatus = its,
                AccessTokenStatus = ats,
                TokenInfo = tokenInfo,
                IsAdministrator = false
            };
            
            return result;
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
   
    }
}

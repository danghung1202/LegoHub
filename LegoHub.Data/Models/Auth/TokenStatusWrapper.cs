using Google.Apis.Oauth2.v2.Data;

namespace LegoHub.Data.Models.Auth
{
    /// <summary>
    /// Stores the result data for both token status responses.
    /// </summary>
    public class TokenStatusWrapper
    {
        public IDTokenStatus IdTokenStatus { get; set; }
        public AccessTokenStatus AccessTokenStatus { get; set; }
        public Tokeninfo TokenInfo { get; set; }
        public bool IsAdministrator { get; set; }
    }
}

namespace LegoHub.Data.Models.Auth
{
    /// <summary>
        /// Stores the result data for the access token verification.
        /// </summary>
        public class AccessTokenStatus
        {
            public bool Valid { get; set; }
            public string GPlusID { get; set; }
            public string Message { get; set; }
        }
}

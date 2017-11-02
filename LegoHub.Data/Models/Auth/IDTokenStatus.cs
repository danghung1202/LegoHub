namespace LegoHub.Data.Models.Auth
{
    /// <summary>
    /// Stores the result data for the ID token verification.
    /// </summary>
    public class IDTokenStatus
    {
        public bool Valid { get; set; }
        public string GPlusID { get; set; }
        public string Message { get; set; }
    }
}

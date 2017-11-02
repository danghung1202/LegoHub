using System.Threading.Tasks;
using LegoHub.Data.Models.Auth;

namespace LegoHub.Data.Helper
{
    public interface IVerifyToken
    {
        Task<TokenStatusWrapper> Verify(string idToken, string accessToken);
    }
}
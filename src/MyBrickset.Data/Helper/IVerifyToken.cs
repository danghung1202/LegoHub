using System.Threading.Tasks;
using MyBrickset.Data.Models.Auth;

namespace MyBrickset.Data.Helper
{
    public interface IVerifyToken
    {
        Task<TokenStatusWrapper> Verify(string idToken, string accessToken);
    }
}
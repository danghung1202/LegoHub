using System.Threading.Tasks;

namespace MyBrickset.Data.Helper
{
    public interface IVerifyToken
    {
        Task<bool> Verify(string idToken, string accessToken);
    }
}
namespace BookRating.Models
{
    public enum Role
    {
        Admin,
        User
    }

    public static class RoleExtensions
    {
        public static string ToRoleString(this Role role)
        {
            return role.ToString();
        }
    }
}
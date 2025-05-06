using System.ComponentModel;

namespace Software.Domain.Enums
{
    public enum Role
    {
        [Description("Administrator")]
        Admin = 1,

        [Description("Doutor")]
        Doctor = 2,

        [Description("Paciente")]
        Patient = 3
    }
}

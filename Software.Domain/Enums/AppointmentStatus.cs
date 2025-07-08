using System.ComponentModel;

namespace Software.Domain.Enums
{
    public enum AppointmentStatus
    {
        [Description("Agendado")]
        Scheduled = 1,

        [Description("Confirmado")]
        Confirmed = 2,

        [Description("Em Andamento")]
        InProgress = 3,

        [Description("Concluído")]
        Completed = 4,

        [Description("Cancelado")]
        Cancelled = 5,

        [Description("Não Compareceu")]
        NoShow = 6
    }
} 
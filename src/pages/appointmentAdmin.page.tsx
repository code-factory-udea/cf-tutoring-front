import { useMutationAppointmentsCSV } from "@hooks/mutations";
import { useQueryAppointments } from "@hooks/queries";
import Button from "@ui/Button";
import { Table } from "@ui/Table";
import { STATUS_LABELS } from "@utils/constants";
import { useEffect, useMemo, useState } from "react";

const COLUMNS = ["Tutor", "Estudiante", "Estado", "Fecha", "Modalidad"];
const getStatusLabel = (status: string) =>
  STATUS_LABELS[status] || "Estado desconocido";

export const AppointmentAdminPage = () => {
  const { mutateAsync: appointmentCSV } = useMutationAppointmentsCSV();
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 15);
    setFinalDate(today.toISOString().split("T")[0]);
    setInitialDate(lastWeek.toISOString().split("T")[0]);
  }, []);

  const { data: appointments, isPending } = useQueryAppointments({
    initialDate,
    finalDate,
  });

  const handleDownload = async () => {
    if (initialDate && finalDate) {
      try {
        const csvData = await appointmentCSV({ initialDate, finalDate });

        const blob = new Blob([csvData], { type: "text/csv" });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `appointments_${initialDate}_to_${finalDate}.csv`;
        document.body.appendChild(a);
        a.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error al descargar el archivo CSV:", error);
      }
    }
  };

  const memoizedAppointments = useMemo(() => {
    if (!appointments) return [];
    return appointments.map((appointment) => {
      const appointmentDate = appointment.date
      ? new Date(appointment.date).toLocaleString('es-ES', {
          dateStyle: 'short', 
          timeStyle: 'short',
        })
      : "Fecha no disponible";
      return [
        <p>{appointment.tutorName}</p>,
        <p>{appointment.studentName}</p>,
        <p>{getStatusLabel(appointment.status)}</p>,
        <p>{appointmentDate}</p>,
        <p>{appointment.virtual ? "Virtual" : "Presencial"}</p>,
      ];
    });
  }, [appointments]);

  return (
    <div className="flex flex-col gap-4">
      <p className="bg-yellow-100 w-fit px-2 py-1 rounded-md text-sm italic">
        Para ver la lista de monitorías realizadas debe seleccionar un rango de
        fechas.
      </p>
      <section className="flex justify-between items-center">
        <div className="flex gap-2 mt-4 mb-2">
          <div>
            <label
              htmlFor="initial-date"
              className="block text-sm font-medium text-primary-green"
            >
              Fecha inicial
            </label>
            <input
              id="initial-date"
              type="date"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              className="bg-light-green/30 rounded-md px-2 py-1 text-dark"
            />
          </div>
          <div>
            <label
              htmlFor="final-date"
              className="block text-sm font-medium text-primary-green"
            >
              Fecha final
            </label>
            <input
              id="final-date"
              type="date"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              className="bg-light-green/30 rounded-md px-2 py-1 text-dark"
            />
          </div>
        </div>
        <div className="h-2 ">
          {" "}
          <Button onClick={handleDownload} label="Descargar CSV" />
        </div>
      </section>
      <Table
        columns={COLUMNS}
        data={memoizedAppointments}
        isLoadingData={isPending}
      />
      {isPending && (
        <p className="text-center text-primary-green text-xl font-bold">
          Buscando...
        </p>
      )}
    </div>
  );
};

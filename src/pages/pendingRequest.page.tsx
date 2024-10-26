import { useMutationAppointmentTutorResponse } from "@hooks/mutations";
import { useQueryAppointmentsTutor } from "@hooks/queries";
import { AppointmentList } from "@interfaces/appointment";
import Button from "@ui/Button";
import { APPOINMENT_STATUS } from "@utils/constants";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const initialTutorships: AppointmentList[] = [
  { id: 1, name: "Matemáticas Avanzadas", date: "2024-10-28", virtual: true },
  { id: 2, name: "Física Moderna", date: "2024-10-30", virtual: false },
  { id: 3, name: "Programación en React", date: "2024-11-02", virtual: true },
];
export const PendingRequestPage = () => {
  const { data: pendingRequests, isLoading } = useQueryAppointmentsTutor(
    APPOINMENT_STATUS.PENDING,
  );
  const { mutateAsync: responseAppointment } =
    useMutationAppointmentTutorResponse();
  const [tutorships, setTutorships] =
    useState<AppointmentList[]>(initialTutorships);

  const handleAccept = async (appointmentId: number) => {
    setTutorships(tutorships.filter((t) => t.id !== appointmentId));
    await responseAppointment({
      appointmentId,
      status: APPOINMENT_STATUS.ACCEPTED,
    });
    toast.success("Tutoría aceptada.");
  };

  const handleReject = async (appointmentId: number) => {
    setTutorships(tutorships.filter((t) => t.id !== appointmentId));
    await responseAppointment({
      appointmentId,
      status: APPOINMENT_STATUS.REJECTED,
    });
  };
  return (
    <div className="p-6 text-dark">
      <h1 className="text-2xl font-bold mb-4">Tutorías Pendientes</h1>

      {tutorships.length > 0 ? (
        <ul className="space-y-4">
          {tutorships.map((tutorship) => (
            <li
              key={tutorship.id}
              className="flex items-center justify-between p-4 bg-white shadow-md rounded-md"
            >
              <div>
                <h2 className="text-lg font-semibold">{tutorship.name}</h2>
                <p className="text-sm text-gray-500">Fecha: {tutorship.date}</p>
                <p className="text-sm text-gray-500">
                  Virtual: {tutorship.virtual ? "Sí" : "No"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  label="Aceptar"
                  onClick={() => handleAccept(tutorship.id)}
                  variant="primary"
                />

                <Button
                  label="Rechazar"
                  onClick={() => handleReject(tutorship.id)}
                  variant="danger"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No hay tutorías pendientes.</p>
      )}

      <ToastContainer />
    </div>
  );
};

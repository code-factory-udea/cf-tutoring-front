import { useMutationAppointmentTutorResponse } from "@hooks/mutations";
import { useQueryAppointmentsTutor } from "@hooks/queries";
import Button from "@ui/Button";
import { Spinner } from "@ui/Spinner";
import { APPOINMENT_STATUS, APPOINTMENT_REQUEST } from "@utils/constants";
import { toast, ToastContainer } from "react-toastify";

export const PendingRequestPage = () => {
  const { data: pendingRequests, isLoading } = useQueryAppointmentsTutor(APPOINMENT_STATUS.PENDING,);
  const { mutateAsync: responseAppointment } = useMutationAppointmentTutorResponse();

  const handleAccept = async (id: number) => {
    await responseAppointment({
      id,
      appointmentResponse: APPOINTMENT_REQUEST.APPROVE,
    });
    toast.success("Tutoría aceptada.");
  };

  const handleReject = async (id: number) => {
    await responseAppointment({
      id,
      appointmentResponse: APPOINTMENT_REQUEST.REJECT,
    });
  };
  return (
    <div className="text-dark">
      <h1 className="text-2xl font-bold mb-4">Tutorías Pendientes</h1>
      {isLoading && <Spinner />}
      {pendingRequests && pendingRequests.length ? (
        <ul className="space-y-4">
          {pendingRequests.map((tutorship) => (
            <li
              key={tutorship.id}
              className="flex items-center justify-between p-4 bg-white shadow-md rounded-md"
            >
              <div>
                <h2 className="text-lg font-semibold">{tutorship.name}</h2>
                <p className="text-sm text-gray-500">Fecha: {new Date(tutorship.date).toLocaleString()}</p>
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

import { useQueryPendingAppointments } from "@hooks/queries";

const RequestWaitingPage = () => {
    const { data, isLoading, isError } = useQueryPendingAppointments("PENDING");
  
    if (isLoading) {
      return <p>Cargando solicitudes en espera...</p>;
    }
  
    if (isError) {
      return <p>Error al cargar las solicitudes en espera.</p>;
    }
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Solicitudes en Espera</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((appointment) => (
            <div key={appointment.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <h2 className="text-lg font-semibold">{appointment.name}</h2>
              <p>
                <strong>Fecha:</strong>{appointment.date}
              </p>
              <p>
                <strong>Hora:</strong> {appointment.startTime} - {appointment.endTime}
              </p>
              <p>
                <strong>Modalidad:</strong> {appointment.virtual ? "Virtual" : "Presencial"}
              </p>
              <p>
                <strong>Estado:</strong> Pendiente
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default RequestWaitingPage;
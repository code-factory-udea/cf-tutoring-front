import { useQueryPendingAppointments } from "@hooks/queries";
import { Table } from "@ui/Table";
import { APPOINMENT_STATUS } from "@utils/constants";
import moment from "moment";
import { useMemo } from "react";
import { ToastContainer } from "react-toastify";

const COLUMNS = ["ID", "Nombre", "Fecha", "Virtual"];
export const RequestRejectedPage = () => {
  const { data: rejectedRequests, isLoading: isLoadingRejected } =
    useQueryPendingAppointments(APPOINMENT_STATUS.REJECTED);

  const memoizedRequest = useMemo(() => {
    if (!rejectedRequests) return [];
    const requests = rejectedRequests;
    requests.sort((a, b) => moment(a.date).diff(moment(b.date)));

    return requests.map((request) => {
      return [
        <p>{request.id}</p>,
        <p>{request.name}</p>,
        <p>
          {moment(request.date).format("YYYY/MM/DD")}, {request.startTime} -{" "}
          {request.endTime}
        </p>,
        <p>{request.virtual ? "Si" : "No"}</p>,
      ];
    });
  }, [rejectedRequests]);

  return (
    <div className="p-6 text-dark">
      <h1 className="text-2xl font-bold mb-4">
        Solicitudes Rechazadas - Estudiantes
      </h1>

      <Table
        columns={COLUMNS}
        data={memoizedRequest}
        isLoadingData={isLoadingRejected}
      />

      <ToastContainer />
    </div>
  );
};

export default RequestRejectedPage;

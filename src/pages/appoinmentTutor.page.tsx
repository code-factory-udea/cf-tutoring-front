import {
  useMutationAppointmentTutorResponse,
  useMutationUpdateAppointmentTutorResponse,
} from "@hooks/mutations";
import { useQueryAppointmentsTutor } from "@hooks/queries";
import { ConfirmAlert } from "@ui/ConfirmAlert";
import { APPOINMENT_STATUS, APPOINTMENT_REQUEST } from "@utils/constants";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import {
  Calendar,
  Event as CalendarEvent,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

moment.locale("es");
const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  start: Date;
  end: Date;
}

const messages = {
  allDay: "Todo el día",
  noEventsInRange: "No hay eventos en este rango",
  showMore: (total) => `+ Ver más (${total})`,
  week: "Semana",
  day: "Día",
};

const dayMap = {
  Sun: "Domingo",
  Mon: "Lunes",
  Tue: "Martes",
  Wed: "Miércoles",
  Thu: "Jueves",
  Fri: "Viernes",
  Sat: "Sábado",
};

function CustomDayHeader({ label }: { label: string }) {
  const dayAbbreviation = label.split(" ")[1];
  const dayInSpanish = dayMap[dayAbbreviation] || label;

  return (
    <div
      style={{
        fontSize: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {dayInSpanish}
    </div>
  );
}

function CustomToolbar({ onView, view }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <button
        className={`${
          view === "week" ? "bg-primary-green text-white mb-2" : ""
        } px-4 py-2 rounded-md hover:bg-primary-green hover:text-white`}
        onClick={() => onView("week")}
      >
        Semana
      </button>
      <button
        className={`${
          view === "day" ? "bg-primary-green text-white" : ""
        } px-4 py-2 rounded-md hover:bg-primary-green hover:text-white`}
        onClick={() => onView("day")}
      >
        Día
      </button>
    </div>
  );
}

export const AppoinmentTutor = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { mutateAsync: updateSchedule } =
    useMutationUpdateAppointmentTutorResponse();
  const { mutateAsync: cancelEvent } = useMutationAppointmentTutorResponse();
  const { data: appoinments } = useQueryAppointmentsTutor(
    APPOINMENT_STATUS.ACCEPTED,
  );
  const convertAppointmentsToEvents = (appointments) => {
    return appointments.map((appointment) => ({
      id: appointment.id,
      title: appointment.name,
      description: appointment.virtual ? "Virtual" : "Presencial",
      start: moment(`${appointment.date} ${appointment.startTime}`).toDate(),
      end: moment(`${appointment.date} ${appointment.endTime}`).toDate(),
    }));
  };

  useEffect(() => {
    if (appoinments) {
      const loadedEvents = convertAppointmentsToEvents(appoinments);
      setEvents(loadedEvents);
    }
  }, [appoinments]);

  const deleteEvent = async (id: number) => {
    await cancelEvent({    id,
      appointmentResponse: APPOINTMENT_REQUEST.CANCEL,
    })}

  const completeEvent = async (id: number) => {
    await updateSchedule({ id });
  };

  const handleEventClick = (event: Event) => {
    const eventDate = moment(event.start);
    const currentDate = moment();

    if (currentDate.isAfter(eventDate)) {
      ConfirmAlert({
        title: "Completar Tutoría",
        message: "¿Deseas marcar esta tutoría como completada?",
        onConfirm: () => {
          completeEvent(event.id);
        },
      });
    } else {
      ConfirmAlert({
        title: "Cancelar Tutoría",
        message: "¿Estás seguro de que deseas cancelar esta tutoría?",
        onConfirm: () => {
          deleteEvent(event.id);
        },
      });
    }
  };

  return (
    <div>
      <h2 className="text-md font-semibold">Las tutorías para esta semana</h2>
      <section className="mb-4">
        <Calendar
          selectable
          localizer={localizer}
          events={events as CalendarEvent[]}
          defaultView="week"
          views={["week", "day"]}
          onSelectEvent={handleEventClick}
          style={{ height: 580 }}
          messages={messages}
          components={{
            toolbar: CustomToolbar,
            day: { header: CustomDayHeader },
            week: { header: CustomDayHeader },
          }}
          min={new Date(2024, 0, 1, 6, 0)}
          max={new Date(2024, 0, 1, 22, 0)}
          eventPropGetter={() => ({
            style: {
              backgroundColor: "#12BAAF",
              borderRadius: "5px",
              opacity: 0.9,
              color: "white",
              border: "1px solid #12BAAF",
              display: "block",
            },
          })}
        />
      </section>
      <ToastContainer />
    </div>
  );
};

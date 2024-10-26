import { Modal } from "@components/Modal";
import {
  useMutationCreateLinkTutorVirtualRoom,
  useMutationCreateTutorSchedule,
  useMutationDeleteTutorSchedule,
} from "@hooks/mutations";
import {
  useQueryTutorLinkVirtualRoom,
  useQueryTutorSchedule,
} from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import {
  Calendar,
  Event as CalendarEvent,
  momentLocalizer,
  SlotInfo,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaEdit, FaSave } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
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

export const AgendaPage: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [slotInfo, setSlotInfo] = useState<SlotInfo | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const { mutateAsync: createSchedule } = useMutationCreateTutorSchedule();
  const { mutateAsync: createLink } = useMutationCreateLinkTutorVirtualRoom();
  const { mutateAsync: deleteSchedule } = useMutationDeleteTutorSchedule();
  const { data: tutorSchedule } = useQueryTutorSchedule();
  const { data: linkTutorVirtualRoom } = useQueryTutorLinkVirtualRoom();
  const [link, setLink] = useState("");
  const [inputValue, setInputValue] = useState(link);

  const convertScheduleToEvents = (schedule) => {
    const daysOfWeek = {
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
      SUNDAY: 7,
    };

    return schedule.map(({ day, startTime, endTime, id }) => {
      const startDate = moment()
        .day(daysOfWeek[day.toUpperCase()])
        .set({
          hour: parseInt(startTime.split(":")[0], 10),
          minute: parseInt(startTime.split(":")[1], 10),
          second: 0,
          millisecond: 0,
        });

      const endDate = moment()
        .day(daysOfWeek[day.toUpperCase()])
        .set({
          hour: parseInt(endTime.split(":")[0], 10),
          minute: parseInt(endTime.split(":")[1], 10),
          second: 0,
          millisecond: 0,
        });

      return {
        start: startDate.toDate(),
        end: endDate.toDate(),
        id,
      };
    });
  };

  useEffect(() => {
    if (tutorSchedule) {
      const loadedEvents = convertScheduleToEvents(tutorSchedule);
      setEvents(loadedEvents);
    }
  }, [tutorSchedule]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSlotInfo(slotInfo);
    setStartTime(moment(slotInfo.start).format("HH:mm"));
    setEndTime(moment(slotInfo.end).format("HH:mm"));
    openModal();
  };

  const handleSaveEvent = async () => {
    if (slotInfo && startTime && endTime) {
      const startDate = moment(slotInfo.start).set({
        hour: parseInt(startTime.split(":")[0]),
        minute: parseInt(startTime.split(":")[1]),
      });

      const endDate = moment(slotInfo.start).set({
        hour: parseInt(endTime.split(":")[0]),
        minute: parseInt(endTime.split(":")[1]),
      });

      if (endDate.isBefore(startDate)) {
        toast.error("La hora final no puede ser anterior a la hora de inicio.");
        return;
      }

      await createSchedule({
        day: startDate.format("dddd").toUpperCase(),
        startTime: `${startDate.format("HH:mm")}`,
        endTime: `${endDate.format("HH:mm")}`,
      });

      closeModal();
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    await createLink({ link: inputValue });
    setLink(inputValue);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const deleteEvent = async (id: number) => {
    await deleteSchedule(id);
  };
  const handleEventClick = (event: Event) => {
    confirmAlert({
      message: "¿Estás seguro de que deseas eliminar este horario?",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            deleteEvent(event.id);
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Eliminación cancelada."),
        },
      ],
    });
  };

  return (
    <div>
      <h2 className="text-md font-semibold">
        Organiza tu disponibilidad para atender tutorías
      </h2>
      <section className="mb-4">
        <Calendar
          selectable
          localizer={localizer}
          events={events as CalendarEvent[]}
          defaultView="week"
          views={["week", "day"]}
          onSelectSlot={handleSelectSlot}
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
      <section className="text-dark w-full justify-center items-center flex flex-col">
        <h3 className="text-md font-semibold">
          Link para dar las tutorías virtuales
        </h3>
        {isEditing ? (
          <div className="w-1/2 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border border-primary-green shadow-lg rounded-md p-1 bg-light-green/30 w-full"
            />
            <button
              onClick={handleSaveClick}
              className="flex items-center gap-1 bg-secondary-green text-white px-2 py-1 rounded-md hover:bg-primary-green shadow-lg"
            >
              <FaSave /> Guardar
            </button>
          </div>
        ) : (
          <div className="flex items-center w-1/2 gap-2">
            <p className="border border-primary-green shadow-lg rounded-md p-1 bg-primary-green w-full text-light text-center">
              {linkTutorVirtualRoom?.link ??
                "No has creado un link para las tutorías"}
            </p>
            <button
              onClick={handleEditClick}
              className="flex items-center gap-1 bg-secondary-green text-white px-2 py-1 rounded-md hover:bg-primary-green shadow-lg"
            >
              <FaEdit /> Editar
            </button>
          </div>
        )}
      </section>
      <Modal isOpen={isOpen} title="Crear Horario">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hora de inicio (HH:mm):
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hora de fin (HH:mm):
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min="06:00"
              max="22:00"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveEvent}
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

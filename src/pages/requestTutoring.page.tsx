import { Modal } from "@components/Modal";
import { useMutationRequestTutoring } from "@hooks/mutations";
import {
  useQueryAcademicPrograms,
  useQueryFaculties,
  useQueryMonitorsBySubjectId,
  useQuerySubjects,
  useQueryTutoringSchedule,
} from "@hooks/queries";
import { Dropdown } from "@ui/Dropdown";
import { Table } from "@ui/Table";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToastContainer } from "react-toastify";

moment.locale("es");
const localizer = momentLocalizer(moment);
const COLUMNS = ["Nombre del Tutor", "Usuario del Tutor"];

const dayMap = {
  Sun: "Domingo",
  Mon: "Lunes",
  Tue: "Martes",
  Wed: "Miércoles",
  Thu: "Jueves",
  Fri: "Viernes",
  Sat: "Sábado",
};

const messages = {
  allDay: "Todo el día",
  noEventsInRange: "No hay eventos en este rango",
  showMore: (total) => `+ Ver más (${total})`,
  week: "Semana",
  day: "Día",
};

function CustomDayHeader({ label }: { label: string }) {
  const dayAbbreviation = label.split(" ")[1];
  const dayInSpanish = dayMap[dayAbbreviation] || label;

  return (
    <div
      style={{
        fontSize: "0.9rem",
        paddingBottom: "0.9rem",
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
      <button
        className={`${
          view === "month" ? "bg-primary-green text-white" : ""
        } px-4 py-2 rounded-md hover:bg-primary-green hover:text-white`}
        onClick={() => onView("month")}
      >
        Mes
      </button>
    </div>
  );
}

const RequestTutoringPage = () => {
  const { data: faculties } = useQueryFaculties();
  const [selectedFaculty, setSelectedFaculty] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedAcademicProgram, setSelectedAcademicProgram] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [selectedSubject, setSelectedSubject] = useState<{
    code: number;
    name: string;
  } | null>(null);

  const { data: academicPrograms } = useQueryAcademicPrograms(
    Number(selectedFaculty?.id),
  );

  const { data: subjects } = useQuerySubjects(
    Number(selectedAcademicProgram?.id),
  );

  const { data: monitors } = useQueryMonitorsBySubjectId(
    selectedSubject?.code || 0,
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [events, setEvents] = useState([]);
  const { data: schedule } = useQueryTutoringSchedule(selectedTutor);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { mutate: requestTutoring } = useMutationRequestTutoring();

  const memoizedFaculties = useMemo(() => {
    if (!faculties) return [];
    return faculties.map((faculty) => ({
      value: faculty.id,
      label: faculty.name,
    }));
  }, [faculties]);

  const memoizedAcademicProgram = useMemo(() => {
    if (!academicPrograms) return [];
    return academicPrograms.map((academic) => ({
      value: academic.id,
      label: academic.name,
    }));
  }, [academicPrograms]);

  const memoizedSubjects = useMemo(() => {
    if (!subjects) return [];
    return subjects.map((subject) => ({
      value: subject.code.toString(),
      label: subject.name,
    }));
  }, [subjects]);

  const memoizedTutors = useMemo(() => {
    if (!monitors) return [];
    return monitors.map((tutor) => {
      return [<p>{tutor.name}</p>, <p>{tutor.username}</p>];
    });
  }, [monitors]);

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
        })
        .local();

      const endDate = moment(startDate)
        .set({
          hour: parseInt(endTime.split(":")[0], 10),
          minute: parseInt(endTime.split(":")[1], 10),
        })
        .local();

      return {
        start: startDate.toDate(),
        end: endDate.toDate(),
        id,
      };
    });
  };

  useEffect(() => {
    if (schedule) {
      const loadedEvents = convertScheduleToEvents(schedule);
      setEvents(loadedEvents);
    }
  }, [schedule]);

  const handleSelect =
    (
      setter: React.Dispatch<
        React.SetStateAction<{ id: string; name: string } | null>
      >,
    ) =>
    (option: { value: string; label: string }) => {
      setter({ id: option.value, name: option.label });
    };

  const handleSelecSubject =
    (
      setter: React.Dispatch<
        React.SetStateAction<{ code: number; name: string } | null>
      >,
    ) =>
    (option: { value: string; label: string }) => {
      setter({ code: Number(option.value), name: option.label });
    };

  const handleRowClick = (row) => {
    const tutorName = row[1].props.children;
    setSelectedTutor(tutorName);
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
    setSelectedTutor(null);
  };

  const handleConfirmTutoring = () => {
    if (!selectedEvent || !selectedTutor) return;

    const startDate = moment(selectedEvent.start).local();
    const endDate = moment(selectedEvent.end).local(); //

    const payload = {
      tutorUsername: selectedTutor,
      isVirtual: true,
      schedule: {
        id: selectedEvent.id,
        day: startDate.format("dddd").toUpperCase(),
        startTime: startDate.format("HH:mm:ss"),
        endTime: endDate.format("HH:mm:ss"),
      },
    };

    requestTutoring(payload, {
      onSuccess: () => {
        setIsConfirmationOpen(false);
        setIsCalendarOpen(false);
      },
    });
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsConfirmationOpen(true);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="text-2xl font-bold">Solicitar Tutoría</h1>
      {memoizedFaculties.length === 0 ? (
        <p className="text-orange-500 font-semibold mx-2">
          No hay facultades registradas
        </p>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Seleccione una facultad</h2>
          <div className="w-1/2">
            <Dropdown
              options={memoizedFaculties}
              placeholder="Seleccione una Facultad"
              onSelect={handleSelect(setSelectedFaculty)}
            />
          </div>
        </div>
      )}
      {selectedFaculty && (
        <div>
          {memoizedAcademicProgram.length === 0 ? (
            <p className="text-orange-500 font-semibold mx-2">
              No hay programas académicos registrados
            </p>
          ) : (
            <div className="w-1/2 space-y-3">
              <h2 className="text-xl font-bold">
                Seleccione un programa académico
              </h2>
              <Dropdown
                placeholder="Seleccione un programa académico"
                options={memoizedAcademicProgram}
                onSelect={handleSelect(setSelectedAcademicProgram)}
              />
            </div>
          )}
        </div>
      )}
      {selectedAcademicProgram && selectedFaculty && (
        <div>
          {memoizedSubjects.length === 0 ? (
            <p className="text-orange-500 font-semibold mx-2">
              No hay materias registradas para el programa académico
              seleccionado
            </p>
          ) : (
            <div className="w-1/2 space-y-3">
              <h2 className="text-xl font-bold">Seleccione una materia</h2>
              <Dropdown
                placeholder="Seleccione una materia"
                options={memoizedSubjects}
                onSelect={handleSelecSubject(setSelectedSubject)}
              />
            </div>
          )}
        </div>
      )}
      {selectedSubject && (
        <>
          <p className="bg-yellow-100 w-fit px-2 py-1 rounded-md text-sm italic">
            Lista de monitores para la materia seleccionada.
          </p>
          <Table
            columns={COLUMNS}
            data={memoizedTutors}
            isLoadingData={false}
            onRowClick={handleRowClick}
          />
        </>
      )}
      {isCalendarOpen && (
        <Modal isOpen={isCalendarOpen}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-semibold">
              Disponibilidad de {selectedTutor}
            </h2>
            <button
              onClick={handleCloseCalendar}
              className="text-gray-500 hover:text-gray-700"
            >
              Cerrar
            </button>
          </div>
          <section className="mb-4 w-full">
            <Calendar
              selectable
              localizer={localizer}
              events={events}
              defaultView="week"
              views={["week", "day"]}
              style={{ height: 580 }}
              min={new Date(2024, 0, 1, 6, 0)}
              max={new Date(2024, 0, 1, 22, 0)}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={() => ({
                style: {
                  backgroundColor: "#12BAAF",
                  borderRadius: "5px",
                  opacity: 0.9,
                  color: "white",
                  border: "1px solid #12BAAF",
                  display: "block",
                  fontSize: "0.9rem",
                },
              })}
              messages={messages}
              components={{
                toolbar: CustomToolbar,
                day: { header: CustomDayHeader },
                week: { header: CustomDayHeader },
              }}
            />
          </section>
        </Modal>
      )}
      {isConfirmationOpen && selectedEvent && (
        <Modal isOpen={isConfirmationOpen} title="Confirmar Tutoría">
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-center">
              ¿Confirmar la tutoría para el horario:{" "}
              <strong>
                {selectedEvent?.title} el día{" "}
                {new Intl.DateTimeFormat("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }).format(new Date(selectedEvent?.start))}
              </strong>
              ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmTutoring}
                className="px-4 py-2 bg-secondary-green text-white rounded-lg hover:bg-primary-green"
              >
                Confirmar
              </button>
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default RequestTutoringPage;

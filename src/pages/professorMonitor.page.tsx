import {
  useQueryProfessorAppointments,
  useQueryProfessorSubjects,
  useQueryProfessorTutors,
} from "@hooks/queries";
import { Dropdown } from "@ui/Dropdown";
import { Spinner } from "@ui/Spinner";
import { Table } from "@ui/Table";
import { STATUS_LABELS } from "@utils/constants";
import { useMemo, useState } from "react";

const COLUMNS = ["Fecha", "Estudiante", "Modalidad", "Estado"];
const getStatusLabel = (status: string) =>
  STATUS_LABELS[status] || "Estado desconocido";

export const ProfessorMonitorPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<{
    code: number;
    name: string;
  } | null>(null);

  const [selectedTutor, setSelectedTutor] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");

  const { data: subjects } = useQueryProfessorSubjects();
  const { data: tutors, isPending: pendingTutors } = useQueryProfessorTutors(
    selectedSubject?.code,
  );
  const { data: appointments, isPending: pendingAppointments } =
    useQueryProfessorAppointments({
      username: selectedTutor?.value,
      initialDate,
      finalDate,
    });

  const handleSelectSubject = (option: { value: string; label: string }) => {
    setSelectedSubject({ code: Number(option.value), name: option.label });
  };

  const handleSelect =
    <T,>(setSelected: React.Dispatch<React.SetStateAction<T | null>>) =>
    (option: { value: string; label: string }) => {
      setSelected(option as T);
    };

  const memoizedSubjects = useMemo(() => {
    if (!subjects) return [];
    return subjects.map((subject) => ({
      value: String(subject.code),
      label: subject.name,
    }));
  }, [subjects]);

  const memoizedTutors = useMemo(() => {
    if (!tutors) return [];
    return tutors.map((tutor) => ({
      value: tutor.username,
      label: tutor.name,
    }));
  }, [tutors]);

  const memoizedAppointments = useMemo(() => {
    if (!appointments) return [];
    return appointments.map((appointment) => {
      const appointmentDate = appointment.date
        ? new Date(appointment.date).toLocaleDateString()
        : "Fecha no disponible";
      return [
        <p>{appointmentDate}</p>,
        <p>{appointment.studentName}</p>,
        <p>{appointment.virtual ? "Virtual" : "Presencial"}</p>,
        <p>{getStatusLabel[appointment.status]}</p>,
      ];
    });
  }, [appointments]);

  return (
    <main>
      <div className="flex gap-2">
        <div className="w-1/2 space-y-2">
          <p className="bg-secondary-green/30 w-fit px-2 py-1 rounded-md text-sm">
            Explora la lista de materias asignadas
          </p>
          <Dropdown
            placeholder="Seleccione una materia"
            options={memoizedSubjects}
            onSelect={handleSelectSubject}
          />
        </div>
        {selectedSubject && (
          <div className="w-1/2 space-y-2">
            <p className="bg-secondary-green/30 w-fit px-2 py-1 rounded-md text-sm">
              Explora la lista de monitores asignados a la materia seleccionada
            </p>
            {pendingTutors && <Spinner />}
            <Dropdown
              placeholder="Seleccione un tutor"
              options={memoizedTutors}
              onSelect={handleSelect(setSelectedTutor)}
            />
            {!memoizedTutors.length && (
              <p className="text-sm ml-2 text-gray-500">
                No hay tutores asignados a esta materia
              </p>
            )}
          </div>
        )}
      </div>
      {selectedTutor && selectedSubject && (
        <section className="mt-6">
          <p className="bg-yellow-100 w-fit px-2 py-1 rounded-md text-sm italic">
            Para ver la lista de monitorías realizadas por el tutor
            seleccionado, debe seleccionar un rango de fechas.
          </p>
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

          {appointments?.length ? (
            <Table
              columns={COLUMNS}
              data={memoizedAppointments}
              isLoadingData={pendingAppointments}
            />
          ) : (
            <p className="mt-4 text-center text-gray-500">
              No se encontraron citas en el rango de fechas seleccionado.
            </p>
          )}
        </section>
      )}
    </main>
  );
};

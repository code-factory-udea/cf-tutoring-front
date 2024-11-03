import { Dropdown } from "@ui/Dropdown";
import { useQueryFaculties, useQueryAcademicPrograms, useQuerySubjects } from "@hooks/queries";
import { useState, useMemo } from "react";
import { useModal } from "@hooks/useModal";
import { useAlert } from "@context/alertContext";


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
      Number(selectedFaculty?.id)
  );

  const { data: subjects } = useQuerySubjects(
    Number(selectedAcademicProgram?.id),
  );
  
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
      label: subject.name
    }));
  }, [subjects]);

  const handleSelect =
    (
      setter: React.Dispatch<
        React.SetStateAction<{ id: string; name: string } | null>
      >,
    ) =>
    (option: { value: string; label: string }) => {
      setter({ id: option.value, name: option.label });
    };

    const handleSelecSubject = (
      setter: React.Dispatch<
        React.SetStateAction<{ code: number; name: string } | null>
      >
    ) => (option: { value: string; label: string }) => {
      setter({ code: Number(option.value), name: option.label }); // Convertimos a número directamente
    };


  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="text-2xl font-bold">Solicitar Tutoría</h1>
      <h2 className="text-xl font-bold">Seleccione una facultad</h2>
      <div className="w-1/2">
        <Dropdown
          options={memoizedFaculties}
          placeholder="Seleccione una Facultad"
          onSelect={handleSelect(setSelectedFaculty)}
        />
      </div>
      {selectedFaculty && (
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
      {selectedAcademicProgram && (
        <div className="w-1/2 space-y-3">
          <h2 className="text-xl font-bold">
            Seleccione una materia
          </h2>
          <Dropdown
            placeholder="Seleccione un programa académico"
            options={memoizedSubjects}
            onSelect={handleSelecSubject(setSelectedSubject)}
          />
        </div>
      )}
    </div>
  );
};

export default RequestTutoringPage;
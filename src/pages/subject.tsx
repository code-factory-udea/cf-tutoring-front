import { Modal } from "@components/Modal";
import { useAlert } from "@context/alertContext";
import { useQueryAcademicPrograms, useQueryFaculties } from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import Button from "@ui/Button";
import { Dropdown } from "@ui/Dropdown";
import { InputText } from "@ui/InputText";
import { Table } from "@ui/Table";
import { useMemo, useState } from "react";
import { FaBook } from "react-icons/fa";

const COLUMNS = ["ID", "Nombre"];

const SubjectPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { data: faculties } = useQueryFaculties();
  const { data: academicPrograms } = useQueryAcademicPrograms();
  const [subject, setSubject] = useState<string>("");
  const { showAlert } = useAlert();

  const [selectedAcademicProgram, setSelectedAcademicProgram] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<{
    id: string;
    name: string;
  } | null>(null);

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

  const handleSelectFaculty = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setSelectedFaculty({
      id: selectedOption.value,
      name: selectedOption.label,
    });
  };
  const handleSelectAcademicProgram = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setSelectedAcademicProgram({
      id: selectedOption.value,
      name: selectedOption.label,
    });
  };
  const handleConfirm = () => {
    if (subject.trim() === "") {
      showAlert("info", "El nombre del programa no puede estar vacío");
      return;
    }
    //TODO: Create subject
    console.log("Nombre de la materia:", subject);
    setSubject("");
    closeModal();
  };

  const handleCreateSubject = () => {
    if (!selectedFaculty || !selectedAcademicProgram) {
      showAlert(
        "info",
        "Seleccione una facultad y un programa académico para continuar",
      );
      return;
    }
    openModal();
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <Dropdown
        placeholder="Seleccione una Facultad"
        options={memoizedFaculties}
        onSelect={handleSelectFaculty}
      />
      {selectedFaculty && (
        <Dropdown
          placeholder="Seleccione un programa académico"
          options={memoizedAcademicProgram}
          onSelect={handleSelectAcademicProgram}
        />
      )}

      {selectedAcademicProgram && selectedFaculty && (
        <div className="w-1/2 flex">
          <Button label="Agregar Una Materia" onClick={handleCreateSubject} />
        </div>
      )}

      <Table
        columns={COLUMNS}
        data={[]}
        isLoadingData={false}
      />
      <Modal isOpen={isOpen} title="Crear una materia">
        <h2 className="text-md font-semibold text-dark/60">
          Facultad: {selectedFaculty?.name}
        </h2>
        <h2 className="text-md font-semibold text-dark/60">
          Programa Académico: {selectedAcademicProgram?.name}
        </h2>
        <InputText
          placeholder="Ingrese el nombre de la materia"
          icon={<FaBook />}
          label="Nombre de la materia"
          name="faculty"
          value={subject}
          required
          onChange={(e) => setSubject(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-primary-green/60 text-white rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-primary-green text-white rounded-lg"
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SubjectPage;

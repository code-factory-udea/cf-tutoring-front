import { Modal } from "@components/Modal";
import { useAlert } from "@context/alertContext";
import { useQueryAcademicPrograms, useQueryFaculties } from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import Button from "@ui/Button";
import { Dropdown } from "@ui/Dropdown";
import { InputText } from "@ui/InputText";
import { Table } from "@ui/Table";
import { useMemo, useState } from "react";
import { HiAcademicCap } from "react-icons/hi2";

const COLUMNS = ["ID", "Nombre"];

const AcademicProgramPage = () => {
  const { data: academicPrograms } = useQueryAcademicPrograms();
  const { data: faculties } = useQueryFaculties();
  const { isOpen, openModal, closeModal } = useModal();
  const { showAlert } = useAlert();
  const [academicName, setAcademicName] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const memoizedAcademicPrograms = useMemo(() => {
    if (!academicPrograms) return [];

    return academicPrograms.map((academic) => {
      return [<p>{academic.id}</p>, <p>{academic.name}</p>];
    });
  }, [academicPrograms]);

  const memoizedFaculties = useMemo(() => {
    if (!faculties) return [];
    return faculties.map((faculty) => ({
      value: faculty.id,
      label: faculty.name,
    }));
  }, [faculties]);

  const handleSelect = (selectedOption: { value: string; label: string }) => {
    setSelectedFaculty({
      id: selectedOption.value,
      name: selectedOption.label,
    });
  };

  const handleConfirm = () => {
    if (academicName.trim() === "") {
      showAlert("info", "El nombre del programa no puede estar vacío");
      return;
    }
    //TODO: Create academic program
    console.log("Nombre del programa:", academicName);
    setAcademicName("");
    closeModal();
  };

  const handleCreateAcademicProgram = () => {
    if (!selectedFaculty) {
      showAlert("info", "Seleccione una facultad para continuar");
      return;
    }
    openModal();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-2xl font-bold">Seleccione una facultad </h3>
      <Dropdown
        placeholder="Seleccione una Facultad"
        options={memoizedFaculties}
        onSelect={handleSelect}
      />
      
      {selectedFaculty && (
        <div className="w-1/2 flex">
          <Button
            label="Agregar Programa Académico"
            onClick={handleCreateAcademicProgram}
          />
        </div>
      )}

      <Table
        columns={COLUMNS}
        data={memoizedAcademicPrograms}
        isLoadingData={false}
      />
      <Modal isOpen={isOpen} title="Crear un programa académico">
        <h2 className="text-md font-semibold text-dark/60">
          Facultad: {selectedFaculty?.name}
        </h2>
        <InputText
          placeholder="Ingrese el nombre del programa académico"
          icon={<HiAcademicCap />}
          label="Nombre del programa académico"
          name="faculty"
          value={academicName}
          required
          onChange={(e) => setAcademicName(e.target.value)}
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

export default AcademicProgramPage;

import { Modal } from "@components/Modal";
import { useAlert } from "@context/alertContext";
import { useMutationCreateFaculty } from "@hooks/mutations";
import { useQueryFaculties } from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import Button from "@ui/Button";
import { InputText } from "@ui/InputText";
import { Table } from "@ui/Table";
import { useMemo, useState } from "react";
import { FaSchool } from "react-icons/fa";

const COLUMNS = ["ID", "Nombre"];

const FacultyPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [facultyName, setFacultyName] = useState<string>("");
  const { mutateAsync: createFaculty } = useMutationCreateFaculty();
  const { data: faculties } = useQueryFaculties();
  const { showAlert } = useAlert();

  const handleRowClick = (index: number) => {
    console.log("Row clicked:", index);
  };

  const handleConfirm = () => {
    if (facultyName.trim() === "") {
      showAlert("info", "El nombre de la facultad no puede estar vacío");
      return;
    }
    createFaculty({ name: facultyName });
    console.log("Nombre de la facultad:", facultyName);
    setFacultyName("");
    closeModal();
  };

  const memoizedFaculties = useMemo(() => {
    if (!faculties) return [];
    return faculties.map((faculty) => {
      return [ <p>{faculty.id}</p>, <p>{faculty.name}</p>];
    });
  }, [faculties]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-1/2 flex">
        <Button label="Agregar Facultad" onClick={openModal} />
      </div>

      <Table
        columns={COLUMNS}
        data={memoizedFaculties}
        onRowClick={handleRowClick}
        isLoadingData={false}
      />
      <Modal isOpen={isOpen} title="Crear una facultad">
        <InputText
          placeholder="Ingrese el nombre de la facultad"
          icon={<FaSchool />}
          label="Nombre de la facultad"
          name="faculty"
          value={facultyName}
          required
          onChange={(e) => setFacultyName(e.target.value)}
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

export default FacultyPage;

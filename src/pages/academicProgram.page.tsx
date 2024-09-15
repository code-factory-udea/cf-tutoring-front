import { useQueryStudents } from "@hooks/queries";
import Button from "@ui/Button";
import { Dropdown } from "@ui/Dropdown";
import { Table } from "@ui/Table";

const AcademicProgramPage = () => {
  const columns = ["ID", "Nombre"];
  const students = [
    [1, "Eliana Puerta"],
    [2, "Juan Lopera"],
    [3, "Mateo Velasquez"],
  ];
  const handleRowClick = (index: number) => {
    console.log("Row clicked:", index);
  };
  const { data: student } = useQueryStudents();
  console.log(student);

  const handleSelect = (index: string) => {
    console.log("Selected:", index);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
        <Dropdown
          placeholder="Seleccione una Facultad"
          options={["Option 1", "Option 2", "Option 3"]}
          onSelect={handleSelect}
        />
       <div className="w-1/2 flex">
        <Button
          label="Agregar Programa Académico"
          onClick={() => console.log("Crear Estudiante")}
        />
      </div>

      <Table
        columns={columns}
        data={students}
        onRowClick={handleRowClick}
        isLoadingData={false}
      />
    </div>
  );
};

export default AcademicProgramPage;

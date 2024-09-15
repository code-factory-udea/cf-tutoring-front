import { useQueryStudents } from "@hooks/queries";
import Button from "@ui/Button";
import { Table } from "@ui/Table";

const FacultyPage = () => {
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
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-1/2 flex">
        <Button
          label="Agregar Facultad"
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

export default FacultyPage;

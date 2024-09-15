import { useQueryStudents } from "@hooks/student";
import { SearchBar } from "@ui/SearchBar";
import { Table } from "@ui/Table";

const StudentPage = () => {
  const columns = ["ID", "Nombre", "Usuario", "Rol"];
  const students = [
    [1, "Eliana Puerta", "Estudiante", "eliana@udea.edu.co"],
    [2, "Juan Lopera", "Monitor", "juan@udea.edu.co"],
    [3, "Mateo Velasquez", "Monitor", "mateo@udea.edu.co"],
  ];

  const handleRowClick = (index: number) => {
    console.log("Row clicked:", index);
  };
  const {data: student} = useQueryStudents();
  console.log(student);
  return (
    <div className="flex flex-col gap-4">

      <SearchBar
        onSearch={(searchTerm) => console.log(searchTerm)}
        placeholder="Buscar Estudiantes"
      />
      <Table
        columns={columns}
        data={students}
        onRowClick={handleRowClick}
        isLoadingData={false}
      />
    </div>
  );
};

export default StudentPage;

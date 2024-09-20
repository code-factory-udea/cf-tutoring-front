import { EditRole } from "@components/EditRole";
import { useQueryStudents } from "@hooks/queries";
import { SearchBar } from "@ui/SearchBar";
import { Table } from "@ui/Table";
import { useMemo } from "react";

const StudentPage = () => {
  const columns = ["ID", "Nombre", "Usuario", "Rol"];
  
  const { data: students } = useQueryStudents();

  const memoizedStudents = useMemo(() => {
    if (!students) return [];
    return students.map((student, index) => {
      return [
        index + 1, 
        <p>{student.name}</p>,
        <strong>{student.username}</strong>, 
        <EditRole role={student.role} username={student.username}/>,
      ];
    });
  }, [students]);

  const handleRowClick = (index: number) => {
    console.log("Row clicked:", index);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        onSearch={(searchTerm) => console.log(searchTerm)}
        placeholder="Buscar Estudiantes"
      />
      <Table
        columns={columns}
        data={memoizedStudents} 
        onRowClick={handleRowClick}
        isLoadingData={!students}
      />
    </div>
  );
};

export default StudentPage;

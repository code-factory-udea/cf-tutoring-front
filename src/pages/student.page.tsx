import { EditRole } from "@components/EditRole";
import { useQueryStudents } from "@hooks/queries";
import { SearchBar } from "@ui/SearchBar";
import { Spinner } from "@ui/Spinner";
import { Table } from "@ui/Table";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

const StudentPage = () => {
  const columns = ["ID", "Nombre", "Usuario", "Rol"];
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: students,
    isPending,
    handleChangeInView,
  } = useQueryStudents({ page: 1, name: searchQuery });
  const { ref: refBottom } = useInView({
    threshold: 0,
    onChange: handleChangeInView,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(searchQuery);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const memoizedStudents = useMemo(() => {
    if (!students) return [];
    const allStudents = students.pages.flatMap((page) => page.userList);

    return allStudents.map((student, index) => {
      return [
        index + 1,
        <p>{student.name}</p>,
        <strong>{student.username}</strong>,
        <EditRole role={student.role} username={student.username} />,
      ];
    });
  }, [students]);

  const onSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  const handleRowClick = (index: number) => {
    console.log("Row clicked:", index);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar onSearch={onSearch} placeholder="Buscar Estudiantes" />
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <Table
            columns={columns}
            data={memoizedStudents}
            onRowClick={handleRowClick}
            isLoadingData={!students}
          />
          <div ref={refBottom} className="w-full py-1" />
        </>
      )}
    </div>
  );
};

export default StudentPage;


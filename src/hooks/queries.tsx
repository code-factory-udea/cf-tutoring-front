import { User } from "@interfaces/user";
import { getAcademicProgram, getFaculty } from "@services/academic";
import { getRoles } from "@services/admin";
import { getStudents, getTutorByUsername } from "@services/student";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useQueryStudents({
  page,
  name,
}: {
  page: number;
  name: string;
}) {
  const response = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["students", page, name],
    queryFn: ({ pageParam = 1 }) => getStudents({ page: pageParam, name }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  });

  const students = response.data?.pages.reduce((prev, curr) => {
    return [...prev, ...curr.userList];
  }, [] as User[]);

  const handleChangeInView = (inView: boolean) => {
    if (response.isFetching || !inView) return;
    response.hasNextPage && response.fetchNextPage();
  };

  return {
    ...response,
    students: students || [],
    handleChangeInView,
  };
}

export const useQueryTutorByUsername = (username: string) =>
  useQuery({
    queryKey: ["tutorByUsername", username],
    queryFn: () => getTutorByUsername(username),
  });

export const useQueryRoles = () =>
  useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

export const useQueryFaculties = () =>
  useQuery({
    queryKey: ["faculties"],
    queryFn: getFaculty,
  });

export const useQueryAcademicPrograms = () =>
  useQuery({
    queryKey: ["academicPrograms"],
    queryFn: getAcademicProgram,
  });

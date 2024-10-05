import { User } from "@interfaces/user";
import { getAcademicProgram, getFaculty } from "@services/academic";
import { getRoles } from "@services/admin";
import { getProfessorByUsername, getProfessors } from "@services/professor";
import {
  getMonitors,
  getStudents,
  getTutorByUsername,
} from "@services/student";
import { getSubjects } from "@services/subject";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Admin } from "../interfaces/admin";
import { getAdmins } from "../services/admin";

export function useQueryAdmins({ page, name }: { page: number; name: string }) {
  const response = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["admins", page, name],
    queryFn: () => getAdmins(page, name),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? Number(lastPage.currentPage) + 1 : undefined,
  });

  const admins = response.data?.pages.reduce((prev, curr) => {
    // Aquí usamos 'userList' ya que es la clave correcta en tu API
    const userList = Array.isArray(curr.userList) ? curr.userList : [];
    return [...prev, ...userList];
  }, [] as Admin[]);

  const handleChangeInView = (inView: boolean) => {
    if (response.isFetching || !inView) return;
    response.hasNextPage && response.fetchNextPage();
  };

  return {
    ...response,
    admins: admins || [],
    handleChangeInView,
  };
}

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

export function useQueryMonitors({
  page,
  name,
}: {
  page: number;
  name: string;
}) {
  const response = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["monitors", page, name],
    queryFn: ({ pageParam = 1 }) => getMonitors({ page: pageParam, name }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  });

  const monitors = response.data?.pages.reduce((prev, curr) => {
    return [...prev, ...curr.userList];
  }, [] as User[]);

  const handleChangeInView = (inView: boolean) => {
    if (response.isFetching || !inView) return;
    response.hasNextPage && response.fetchNextPage();
  };

  return {
    ...response,
    monitors: monitors || [],
    handleChangeInView,
  };
}

export function useQueryProfessor({
  page,
  name,
}: {
  page: number;
  name: string;
}) {
  const response = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["professors", page, name],
    queryFn: ({ pageParam = 1 }) => getProfessors({ page: pageParam, name }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  });

  const professors = response.data?.pages.reduce((prev, curr) => {
    return [...prev, ...curr.userList];
  }, [] as User[]);

  const handleChangeInView = (inView: boolean) => {
    if (response.isFetching || !inView) return;
    response.hasNextPage && response.fetchNextPage();
  };

  return {
    ...response,
    professors: professors || [],
    handleChangeInView,
  };
}

export const useQueryProfessorByUsername = (username: string) =>
  useQuery({
    queryKey: ["professorByUsername", username],
    queryFn: () => getProfessorByUsername(username),
  });

export const useQuerySubjects = (academicProgramId: number) =>
  useQuery({
    queryKey: ["subjects", academicProgramId],
    queryFn: () => getSubjects({ academicProgramId }),
    enabled: !!academicProgramId,
  });

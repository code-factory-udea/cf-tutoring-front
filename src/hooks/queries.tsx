import { User } from "@interfaces/user";
import { getAcademicProgram, getFaculty } from "@services/academic";
import { getRoles } from "@services/admin";
import {
  getAppointmentsTutor,
  getAppointmentTutorCompleted,
} from "@services/appointment";
import { getProfessorByUsername, getProfessors } from "@services/professor";
import {
  getMonitors,
  getStudents,
  getTutorByUsername,
  getMonitorsBySubjectId,
  getTutoringSchedule,
  getPendingAppointments
} from "@services/student";
import { getSubjects } from "@services/subject";
import { getLinkTutorVirtualRoom, getTutorSchedule } from "@services/tutor";
import { getUndefined } from "@services/undefined";
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

export const useQueryAcademicPrograms = (facultyId: number) =>
  useQuery({
    queryKey: ["academicPrograms", facultyId],
    queryFn: () => getAcademicProgram({ facultyId }),
    enabled: !!facultyId,
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

export function useQueryUndefined({
  page,
  name,
}: {
  page: number;
  name: string;
}) {
  const response = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["undefineds", page, name],
    queryFn: ({ pageParam = 1 }) => getUndefined({ page: pageParam, name }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  });

  const userUndefined = response.data?.pages.reduce((prev, curr) => {
    return [...prev, ...curr.userList];
  }, [] as User[]);

  const handleChangeInView = (inView: boolean) => {
    if (response.isFetching || !inView) return;
    response.hasNextPage && response.fetchNextPage();
  };

  return {
    ...response,
    undefineds: userUndefined || [],
    handleChangeInView,
  };
}

export const useQueryTutorSchedule = () =>
  useQuery({
    queryKey: ["tutorSchedule"],
    queryFn: () => getTutorSchedule(),
  });

export const useQueryTutorLinkVirtualRoom = () =>
  useQuery({
    queryKey: ["tutorLinkVirtualRoom"],
    queryFn: () => getLinkTutorVirtualRoom(),
  });

export const useQueryAppointmentsTutor = (status: string) =>
  useQuery({
    queryKey: ["appointmentsTutor"],
    queryFn: () => getAppointmentsTutor(status),
    enabled: !!status,
  });

export const useQueryMonitorsBySubjectId = (subjectId: number) => 
  useQuery({
    queryKey: ["monitorsBySubjectId", subjectId],
    queryFn: () => getMonitorsBySubjectId(subjectId),
    enabled: !!subjectId,
  });

  export const useQueryTutoringSchedule = (username: string | null) => 
    useQuery({
      queryKey: ["tutorSchedule", username],
      queryFn: () => {
        if (!username) throw new Error("Username is required");
        return getTutoringSchedule(username);
      },
      enabled: !!username,
    });

    export const useQueryPendingAppointments = (status: string) =>
      useQuery({
        queryKey: ["pendingAppointments", status],
        queryFn: () => getPendingAppointments({ status }),
        enabled: !!status,
      });

export const useQueryAppointmentsTutorCompleted = (appoimentId: number) =>
  useQuery({
    queryKey: ["appointmentsTutorCompleted", appoimentId],
    queryFn: () => getAppointmentTutorCompleted(appoimentId),
  });

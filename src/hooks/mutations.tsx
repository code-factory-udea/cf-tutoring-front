import { useAlert } from "@context/alertContext";
import {
  postAcademicProgram,
  postFaculty,
  updateAcademicProgram,
} from "@services/academic";
import {
  getAppointmentsCSV,
  postAppointmentTutorResponse,
  updateAppointmentTutorResponse,
} from "@services/appointment";
import { authLogin } from "@services/auth";
import {
  deleteProfessorSubject,
  postProfessorSubject,
} from "@services/professor";
import {
  cancelTutoring,
  cancelTutoringProgram,
  postAppointmentSurvey,
  requestTutoring,
} from "@services/student";
import {
  deleteSubjectTutor,
  postSubject,
  postSubjectTutor,
  updateSubject,
} from "@services/subject";
import {
  deleteTutorSchedule,
  postLinkTutorVirtualRoom,
  postTutorSchedule,
} from "@services/tutor";
import { updateUserRole } from "@services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useMutationValidateUser = () => {
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: authLogin,
    onSuccess: () => {
      toast.success("Usuario autenticado correctamente.");
    },
    onError: (error) => {
      showAlert("error", error.message);
    },
  });
};

export const useMutationUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      toast.success("Rol actualizado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["userApiKeys"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["professors"] });
      queryClient.invalidateQueries({ queryKey: ["monitors"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationCreateFaculty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postFaculty,
    onSuccess: () => {
      toast.success("Facultad creada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["faculties"] });
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      toast.error("Error al crear la facultad.");
    },
  });
};

export const useMutationCreateAcademicProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAcademicProgram,
    onSuccess: () => {
      toast.success("Programa académico creado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["academicPrograms"] });
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      toast.error("Error al crear el programa académico.");
    },
  });
};

export const useMutationCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSubject,
    onSuccess: () => {
      toast.success("Materia creada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      toast.error("Error al crear la materia.");
    },
  });
};

export const useMutationSubjectProfessor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postProfessorSubject,
    onSuccess: () => {
      toast.success("Materia asignado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["professorByUsername"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationDeleteSubjectProfessor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProfessorSubject,
    onSuccess: () => {
      toast.success("Materia eliminada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["professorByUsername"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationCreateSubjectTutor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSubjectTutor,
    onSuccess: () => {
      toast.success("Materia asignada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["tutorByUsername"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationDeleteSubjectTutor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubjectTutor,
    onSuccess: () => {
      toast.success("Materia eliminada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["tutorByUsername"] });
      queryClient.refetchQueries({ queryKey: ["tutorByUsername"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubject,
    onSuccess: () => {
      toast.success("Materia actualizada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationUpdateAcademicProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAcademicProgram,
    onSuccess: () => {
      toast.success("Programa Académico actualizado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["academicPrograms"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationCreateTutorSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTutorSchedule,
    onSuccess: () => {
      toast.success("Horario creado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["tutorSchedule"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationCreateLinkTutorVirtualRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLinkTutorVirtualRoom,
    onSuccess: () => {
      toast.success("Link de sala virtual creado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["tutorLinkVirtualRoom"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationDeleteTutorSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTutorSchedule,
    onSuccess: () => {
      toast.success("Horario eliminado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["tutorSchedule"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationAppointmentTutorResponse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAppointmentTutorResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointmentsTutor"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationUpdateAppointmentTutorResponse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointmentTutorResponse,
    onSuccess: () => {
      toast.success("Monitoría finalizada correctamente."),
        queryClient.invalidateQueries({
          queryKey: ["appointmentsTutor"],
        });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationAppointmentsCSV = () =>
  useMutation({
    mutationFn: getAppointmentsCSV,
  });

export const useMutationRequestTutoring = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: requestTutoring,
    onSuccess: () => {
      showAlert("success", "Solicitud de tutoría creada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["tutoringSchedule"] });
      queryClient.invalidateQueries({ queryKey: ["appointmentsTutor"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutateAppointmentSurvey = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: postAppointmentSurvey,
    onSuccess: () => {
      showAlert("success", "Calificación enviada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["pendingAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointmentsTutor"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationCancelTutoring = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: cancelTutoring,
    onSuccess: () => {
      showAlert("success", "¡Tutoría cancelada correctamente!");
      queryClient.invalidateQueries({ queryKey: ["pendingAppointments"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMutationCancelTutoringProgram = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: cancelTutoringProgram,
    onSuccess: () => {
      showAlert("success", "¡Tutoría cancelada correctamente!");
      queryClient.invalidateQueries({ queryKey: ["pendingAppointments"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

import { useAlert } from "@context/alertContext";
import { postAcademicProgram, postFaculty, updateAcademicProgram } from "@services/academic";
import { authLogin } from "@services/auth";
import { deleteProfessorSubject, postProfessorSubject } from "@services/professor";
import { deleteSubjectTutor, postSubject, postSubjectTutor, updateSubject } from "@services/subject";
import { updateUserRole } from "@services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationValidateUser = () => {
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: authLogin,
    onSuccess: () => {
      showAlert("success", "Usuario autenticado correctamente.");
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      showAlert("error", "Usuario o Contraseña incorrectos.");
    },
  });
};

export const useMutationUpdateUserRole = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      showAlert("success", "Rol actualizado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["userApiKeys"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["professors"] });
      queryClient.invalidateQueries({ queryKey: ["monitors"] });
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      showAlert("error", error.message);
    },
  });
};


export const useMutationCreateFaculty = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: postFaculty,
    onSuccess: () => {
      showAlert("success", "Facultad creada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["faculties"] });
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      showAlert("error", "Error al crear la facultad.");
    },
  });
}

export const useMutationCreateAcademicProgram = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: postAcademicProgram,
    onSuccess: () => {
      showAlert("success", "Programa académico creado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["academicPrograms"] });
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      showAlert("error", "Error al crear el programa académico.");
    },
  });
}

export const useMutationCreateSubject = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: postSubject,
    onSuccess: () => {
      showAlert("success", "Materia creada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      showAlert("error", "Error al crear la materia.");
    },
  });
}

export const useMutationSubjectProfessor = () =>{
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: postProfessorSubject,
    onSuccess: () => {
      showAlert("success", "Materia asignado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["professorByUsername"] });
    },
    onError: (error) => {
      showAlert("error", error.message);
    },
  });
}

export const useMutationDeleteSubjectProfessor = () =>{
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: deleteProfessorSubject,
    onSuccess: () => {
      showAlert("success", "Materia eliminada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["professorByUsername"] });
    },
    onError: (error) => {
      showAlert("error", error.message);
    },
  }); }
  
export const useMutationCreateSubjectTutor = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: postSubjectTutor,
    onSuccess: () => {
      showAlert("success", "Materia asignada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["tutorByUsername"] });
    },
    onError: (error) => {
      showAlert("error", error.message);
    },
  });
}

export const useMutationDeleteSubjectTutor = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: deleteSubjectTutor,
    onSuccess: () => {
      showAlert("success", "Materia eliminada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["tutorByUsername"] });
      queryClient.refetchQueries({ queryKey: ["tutorByUsername"] });
    },
    onError: (error) => {
      showAlert("error", error.message);
    },
  });
}

export const useMutationUpdateSubject = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: updateSubject,
    onSuccess: () => {
      showAlert("success", "Materia actualizada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error) => {
      showAlert("error", error.message);
    },
  });
}

export const useMutationUpdateAcademicProgram = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: updateAcademicProgram,
    onSuccess: () => {
      showAlert("success", "Programa Académico actualizado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["academicPrograms"] });
    },
    onError: (error) => {
      showAlert("error", error.message);
    },
  });
}
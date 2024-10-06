import { useAlert } from "@context/alertContext";
import { postAcademicProgram, postFaculty } from "@services/academic";
import { authLogin } from "@services/auth";
import { postSubject } from "@services/subject";
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
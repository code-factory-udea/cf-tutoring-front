import { useAlert } from "@context/alertContext";
import { authLogin } from "@services/auth";
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
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      showAlert("error", "Error al actualizar el rol.");
    },
  });
};

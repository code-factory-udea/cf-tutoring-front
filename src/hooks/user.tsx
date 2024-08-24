import { useAlert } from "@context/alertContext";
import { authLogin } from "@services/auth";
import { useMutation } from "@tanstack/react-query";

export const useValidateUserMutation = () => {
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

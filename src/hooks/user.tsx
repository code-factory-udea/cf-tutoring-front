import { useMutation } from '@tanstack/react-query'
import { authLogin } from '../services/auth'
import { useAlert } from '@context/alertContext'

export const useValidateUserMutation = () => useMutation({
    const { showAlert } = useAlert()

    mutationFn: authLogin,
    onSuccess: (data) => {
        showAlert('success', 'Usuario autenticado correctamente.');
    },
    onError: (error) => {
        showAlert('error', 'Usuario o Contraseña incorrectos.');
    },
})

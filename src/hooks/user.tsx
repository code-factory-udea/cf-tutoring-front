import { useMutation } from '@tanstack/react-query'
import { authLogin } from '../services/auth'

export const useValidateUserMutation = () => {
    return useMutation({
        mutationFn: authLogin,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.error('Error fetching data:', error)
        },
    })
}

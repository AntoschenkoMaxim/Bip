import { useMutation, useQueryClient } from 'react-query'
import { userRegistration } from '../api/registrationRequest'

export const useRegistrationQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: userRegistration,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['login'],
      })
    },
  })
}

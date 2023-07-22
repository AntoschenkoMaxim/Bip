import { useMutation, useQueryClient } from 'react-query'
import { userRegistration } from '../api/registrationRequest'
import { message } from 'antd'

export const useRegistrationQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: userRegistration,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['login'],
      })
      message.success('Успешно зарегистрирован!')
    },
  })
}

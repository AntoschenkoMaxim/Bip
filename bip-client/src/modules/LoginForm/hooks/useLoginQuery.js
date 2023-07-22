import { useMutation, useQueryClient } from 'react-query'
import { loginUser } from '../api/loginRequest'
import { message } from 'antd'

export const useLoginQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['login'],
      })
      message.success('Успешно авторизован')
    },
  })
}

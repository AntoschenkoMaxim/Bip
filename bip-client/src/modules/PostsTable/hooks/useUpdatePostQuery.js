import { useMutation, useQueryClient } from 'react-query'
import { updatePostById } from '../api/updatePostRequest'
import { message } from 'antd'

export const useUpdatePostQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updatePostById,
    onSuccess: () => {
      client.invalidateQueries(['posts'])
      message.success('Новость обновлена!')
    },
  })
}

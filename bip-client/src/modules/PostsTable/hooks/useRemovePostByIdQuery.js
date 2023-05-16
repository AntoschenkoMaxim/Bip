import { useMutation, useQueryClient } from 'react-query'
import { removePostById } from '../api/removePostRequest'
import { message } from 'antd'

export const useRemovePostByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removePostById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['posts'] })
      message.success('Новость удалена!')
    },
  })
}

import { useMutation, useQueryClient } from 'react-query'
import { updatePostsCategoryById } from '../api/updatePostsCategoryRequest'
import { message } from 'antd'

export const useUpdatePostsCategoryByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updatePostsCategoryById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['posts-categories'] })
      message.success('Категория обновлена!')
    },
  })
}

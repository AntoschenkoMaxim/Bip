import { useMutation, useQueryClient } from 'react-query'
import { updatePostCategoryById } from '../api/updatePostCategoryRequest'
import { message } from 'antd'

export const useUpdatePostCategoryByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updatePostCategoryById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['post-categories'] })
      message.success('Категория обновлена!')
    },
  })
}

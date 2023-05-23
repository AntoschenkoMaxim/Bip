import { useMutation, useQueryClient } from 'react-query'
import { removePostCategoryById } from '../api/removePostCategoryRequest'
import { message } from 'antd'

export const useRemovePostCategoryByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removePostCategoryById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['post-categories'] })
      message.success('Категория удалена!')
    },
  })
}

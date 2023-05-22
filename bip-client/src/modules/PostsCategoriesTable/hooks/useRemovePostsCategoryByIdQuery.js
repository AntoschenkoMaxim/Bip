import { useMutation, useQueryClient } from 'react-query'
import { removePostsCategoryById } from '../api/removePostsCategoryRequest'
import { message } from 'antd'

export const useRemovePostsCategoryByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removePostsCategoryById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['posts-categories'] })
      message.success('Категория удалена!')
    },
  })
}

import { useMutation, useQueryClient } from 'react-query'
import { removeImageCategoryById } from '../api/removeImageCategoryRequest'
import { message } from 'antd'

export const useRemoveImageCategoryByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeImageCategoryById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['image-categories'] })
      message.success('Категория удалена!')
    },
  })
}

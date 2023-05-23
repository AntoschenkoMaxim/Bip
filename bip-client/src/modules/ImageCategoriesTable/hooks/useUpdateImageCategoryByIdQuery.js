import { useMutation, useQueryClient } from 'react-query'
import { updateImageCategoryById } from '../api/updateImageCategoryRequest'
import { message } from 'antd'

export const useUpdateImageCategoryByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateImageCategoryById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['image-categories'] })
      message.success('Категория обновлена!')
    },
  })
}

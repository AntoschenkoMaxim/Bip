import { useMutation, useQueryClient } from 'react-query'
import { createImageCategory } from '../api/createCategoryRequest'
import { message } from 'antd'

export const useCreateImageCategoryQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createImageCategory,
    onSuccess: () => {
      client.invalidateQueries(['image-categories'])
      message.success('Категория добавлена!')
    },
  })
}

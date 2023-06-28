import { useMutation, useQueryClient } from 'react-query'
import { createPostCategory } from '../api/createPostCategoryRequest'
import { message } from 'antd'

export const useCreatePostCategoryQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createPostCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['post-categories'] })
      message.success('Категория добавлена!')
    },
  })
}

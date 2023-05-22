import { useMutation, useQueryClient } from 'react-query'
import { createPostsCategory } from '../api/createPostsCategoryRequest'
import { message } from 'antd'

export const useCreatePostsCategoryQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createPostsCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['posts-categories'] })
      message.success('Категория добавлена!')
    },
  })
}

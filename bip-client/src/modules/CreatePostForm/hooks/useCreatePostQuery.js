import { useMutation, useQueryClient } from 'react-query'
import { createPost } from '../api/createPostRequest'
import { message } from 'antd'

export const useCreatePostQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      client.invalidateQueries(['posts'])
      message.success('Новость добавлена!')
    },
  })
}

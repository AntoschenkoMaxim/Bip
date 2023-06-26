import { useMutation, useQueryClient } from 'react-query'
import { createImage } from '../api/createImageRequest'
import { message } from 'antd'

export const useCreateImageQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createImage,
    onSuccess: () => {
      client.invalidateQueries(['images'])
      message.success('Изображение добавлено!')
    },
  })
}

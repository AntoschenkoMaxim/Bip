import { useMutation, useQueryClient } from 'react-query'
import { updateImageById } from '../api/updateImageRequest'
import { message } from 'antd'

export const useUpdateImageByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateImageById,
    onSuccess: () => {
      client.invalidateQueries(['images'])
      message.success('Изображение обновлено!')
    },
  })
}

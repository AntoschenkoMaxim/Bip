import { useMutation, useQueryClient } from 'react-query'
import { removeImageById } from '../api/removeImageRequest'
import { message } from 'antd'

export const useRemoveImageByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeImageById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['images'] })
      message.success('Изображение удалено!')
    },
  })
}

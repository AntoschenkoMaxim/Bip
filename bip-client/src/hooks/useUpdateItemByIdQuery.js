import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { updateItemById } from '../api/updateItemRequest'

export const useUpdateItemByIdQuery = (url, key) => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateItemById(data, url),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [key] })
      message.success('Успешно обновлено!')
    },
  })
}

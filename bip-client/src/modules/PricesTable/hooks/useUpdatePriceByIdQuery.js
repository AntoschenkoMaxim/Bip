import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { updatePriceById } from '../api/updatePriceRequest'

export const useUpdatePriceByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updatePriceById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['prices'] })
      message.success('Стоимость обучения обновлена!')
    },
  })
}

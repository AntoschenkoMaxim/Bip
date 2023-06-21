import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { removePriceById } from '../api/removePriceRequest'

export const useRemovePriceByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removePriceById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['prices'] })
      message.success('Стоимость обучения удалена!')
    },
  })
}

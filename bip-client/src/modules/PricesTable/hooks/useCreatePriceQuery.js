import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { createPrice } from '../api/createPriceRequest'

export const useCreatePriceQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createPrice,
    onSuccess: () => {
      client.invalidateQueries(['prices'])
      message.success('Стоимость обучения добавлена!')
    },
  })
}

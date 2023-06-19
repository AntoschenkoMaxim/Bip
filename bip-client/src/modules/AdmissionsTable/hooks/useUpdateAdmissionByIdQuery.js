import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { updateAdmissionById } from '../api/updateAdmissionRequest'

export const useUpdateAdmissionByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateAdmissionById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['admissions'] })
      message.success('Порядок приема обновлен!')
    },
  })
}

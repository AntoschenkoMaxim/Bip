import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { removeAdmissionById } from '../api/removeAdmissionRequest'

export const useRemoveAdmissionByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeAdmissionById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['admissions'] })
      message.success('Порядок приема удален!')
    },
  })
}

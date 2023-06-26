import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { createAdmission } from '../api/createAdmissionRequest'

export const useCreateAdmissionQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createAdmission,
    onSuccess: () => {
      client.invalidateQueries(['admissions'])
      message.success('Порядок приема добавлен!')
    },
  })
}

import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { removeScheduleById } from '../api/removeScheduleRequest'

export const useRemoveScheduleByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeScheduleById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['schedules'] })
      message.success('График учебного процесса удален!')
    },
  })
}

import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { updateScheduleById } from '../api/updateScheduleRequest'

export const useUpdateScheduleByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateScheduleById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['schedules'] })
      message.success('График учебного процесса обновлен!')
    },
  })
}

import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { createSchedule } from '../api/createScheduleRequest'

export const useCreateScheduleQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      client.invalidateQueries(['schedules'])
      message.success('График учебного процесса добавлен!')
    },
  })
}

import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { createTimetable } from '../api/createTimetableRequest'

export const useCreateTimetableQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createTimetable,
    onSuccess: () => {
      client.invalidateQueries(['timetables'])
      message.success('Расписание добавлено!')
    },
  })
}

import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { updateTimetableById } from '../api/updateTimetableRequest'

export const useUpdateTimetableByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateTimetableById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['timetables'] })
      message.success('Расписание обновлено!')
    },
  })
}

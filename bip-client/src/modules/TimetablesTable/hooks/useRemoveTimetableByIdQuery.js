import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { removeTimetableById } from '../api/removeTimetableRequest'

export const useRemoveTimetableByIdQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: removeTimetableById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['timetables'] })
      message.success('Расписание удалено!')
    },
  })
}

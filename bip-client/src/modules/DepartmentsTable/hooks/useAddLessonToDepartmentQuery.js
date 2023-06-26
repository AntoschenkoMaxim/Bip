import { message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { addLessonToDepartment } from '../api/addLessonToDepartmentRequest'

export const useAddLessonToDepartmentQuery = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: addLessonToDepartment,
    onSuccess: () => {
      client.invalidateQueries(['departments'])
      message.success('Предмет добавлен!')
    },
  })
}

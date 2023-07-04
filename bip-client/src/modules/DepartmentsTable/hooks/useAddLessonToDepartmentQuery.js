import { message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { addLessonToDepartment } from '../api/addLessonToDepartmentRequest'

export const useAddLessonToDepartmentQuery = (url, key) => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (data) => addLessonToDepartment(data, url),
    onSuccess: () => {
      client.invalidateQueries([key])
      message.success('Предмет добавлен!')
    },
  })
}

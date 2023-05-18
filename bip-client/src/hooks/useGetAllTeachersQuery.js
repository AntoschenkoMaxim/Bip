import { useQuery } from 'react-query'
import { getAllTeachers } from '../api/getTeachersRequest'

export const useGetAllTeachersQuery = () => {
  return useQuery({
    queryFn: () => getAllTeachers(),
    queryKey: ['teachers'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}

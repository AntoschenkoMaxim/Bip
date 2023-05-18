import { useQuery } from 'react-query'
import { getAllDepartments } from '../api/getDepartmentsRequest'

export const useGetAllDepartmentsQuery = () => {
  return useQuery({
    queryFn: () => getAllDepartments(),
    queryKey: ['departments'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}

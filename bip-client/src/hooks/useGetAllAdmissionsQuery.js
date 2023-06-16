import { useQuery } from 'react-query'
import { getAllAdmissions } from '../api/getAdmissionsRequest'

export const useGetAllAdmissionsQuery = () => {
  return useQuery({
    queryFn: () => getAllAdmissions(),
    queryKey: ['admissions'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}

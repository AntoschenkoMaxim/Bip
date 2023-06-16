import { useQuery } from 'react-query'
import { getAllStatements } from '../api/getStatementsRequest'

export const useGetAllStatementsQuery = () => {
  return useQuery({
    queryFn: () => getAllStatements(),
    queryKey: ['statements'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}

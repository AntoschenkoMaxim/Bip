import { useQuery } from 'react-query'
import { getAllPosts } from '../api/getPostsRequest'

export const useGetAllPostsQuery = () => {
  return useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}

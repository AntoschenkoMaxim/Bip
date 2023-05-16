import { useQuery } from 'react-query'
import { getAllPostsCategories } from '../api/getPostsCategoriesRequest'

export const useGetPostsCategoriesQuery = () => {
  return useQuery({
    queryFn: () => getAllPostsCategories(),
    queryKey: ['posts-categories'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}

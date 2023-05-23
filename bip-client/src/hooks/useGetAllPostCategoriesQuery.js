import { useQuery } from 'react-query'
import { getAllPostCategories } from '../api/getPostCategoriesRequest'

export const useGetAllPostCategoriesQuery = () => {
  return useQuery({
    queryFn: () => getAllPostCategories(),
    queryKey: ['post-categories'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}

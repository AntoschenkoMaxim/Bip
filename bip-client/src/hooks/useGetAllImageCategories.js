import { useQuery } from 'react-query'
import { getAllImageCategories } from '../api/getImageCategories'

export const useGetAllImageCategoriesQuery = () => {
  return useQuery({
    queryFn: () => getAllImageCategories(),
    queryKey: ['image-categories'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}

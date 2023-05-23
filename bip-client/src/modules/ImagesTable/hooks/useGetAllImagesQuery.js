import { useQuery } from 'react-query'
import { getAllImages } from '../api/getImagesRequest'

export const useGetAllImagesQuery = () => {
  return useQuery({
    queryFn: () => getAllImages(),
    queryKey: ['images'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })
}

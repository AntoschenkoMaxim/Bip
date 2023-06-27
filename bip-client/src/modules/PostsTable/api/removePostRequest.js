import { POSTS_URL } from '../../../constants/postsUrl'
import { api } from '../../../api/interceptors'

export async function removePostById(id) {
  return api({
    method: 'DELETE',
    url: `${POSTS_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

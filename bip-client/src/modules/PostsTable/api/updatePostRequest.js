import { POSTS_URL } from '../../../constants/postsUrl'
import { api } from '../../../api/interceptors'

export async function updatePostById(postData) {
  const id = postData.get('id')
  return api({
    method: 'PATCH',
    url: `${POSTS_URL}/${id}`,
    data: postData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

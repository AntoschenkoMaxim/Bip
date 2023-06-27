import { POSTS_URL } from '../../../constants/postsUrl'
import { api } from '../../../api/interceptors'

export async function createPost(postData) {
  return api({
    method: 'POST',
    url: POSTS_URL,
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

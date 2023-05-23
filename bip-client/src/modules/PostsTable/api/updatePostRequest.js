import axios from 'axios'
import { POSTS_URL } from '../../../constants/postsUrl'

export async function updatePostById(postData) {
  const id = postData.get('id')
  return axios({
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

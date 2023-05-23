import axios from 'axios'
import { POSTS_URL } from '../../../constants/postsUrl'

export async function removePostById(id) {
  return axios({
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

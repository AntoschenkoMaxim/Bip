import axios from 'axios'
import { POSTS_URL } from '../../../constants/postsUrl'

export async function getPostsByCategoryId(id) {
  return axios({
    method: 'GET',
    url: `${POSTS_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

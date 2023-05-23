import axios from 'axios'
import { POSTS_URL } from '../../../constants/postsUrl'

export async function createPost(postData) {
  return axios({
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

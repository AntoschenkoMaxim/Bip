import axios from 'axios'
import { POSTS_URL } from '../constants/postsUrl'

export async function getAllPosts() {
  return axios({
    method: 'GET',
    url: POSTS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

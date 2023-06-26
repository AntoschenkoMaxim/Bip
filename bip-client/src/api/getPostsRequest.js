import { POSTS_URL } from '../constants/postsUrl'
import { api } from './interceptors'

export async function getAllPosts() {
  return api({
    method: 'GET',
    url: POSTS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

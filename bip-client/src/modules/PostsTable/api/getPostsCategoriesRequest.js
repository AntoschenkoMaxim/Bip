import axios from 'axios'
import { POSTS_CATEGORIES_URL } from '../constants/postsCategoriesUrl'

export async function getAllPostsCategories() {
  return axios({
    method: 'GET',
    url: POSTS_CATEGORIES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

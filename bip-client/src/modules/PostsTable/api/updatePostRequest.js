import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function updatePostById(postData) {
  return axios({
    method: 'PATCH',
    url: `${BASE_URL}/${postData.get('id')}`,
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

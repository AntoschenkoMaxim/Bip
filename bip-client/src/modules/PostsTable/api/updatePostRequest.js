import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function updatePostById(postData) {
  const id = postData.get('id')
  return axios({
    method: 'PATCH',
    url: `${BASE_URL}/${id}`,
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

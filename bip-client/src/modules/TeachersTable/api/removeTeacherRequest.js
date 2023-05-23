import axios from 'axios'
import { TEACHERS_URL } from '../../../constants/teachersUrl'

export async function removeTeacherById(id) {
  return axios({
    method: 'DELETE',
    url: `${TEACHERS_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

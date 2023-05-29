import axios from 'axios'
import { TEACHERS_URL } from '../../../constants/teachersUrl'

export async function getTeacherById(id) {
  return axios({
    method: 'GET',
    url: `${TEACHERS_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

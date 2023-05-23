import axios from 'axios'
import { DEPARTMENTS_URL } from '../../../constants/departmentsUrl'

export async function removeDepartmentById(id) {
  return axios({
    method: 'DELETE',
    url: `${DEPARTMENTS_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

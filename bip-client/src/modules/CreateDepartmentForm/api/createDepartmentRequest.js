import axios from 'axios'
import { DEPARTMENTS_URL } from '../../../constants/departmentsUrl'

export async function createDepartment(departmentData) {
  return axios({
    method: 'POST',
    url: DEPARTMENTS_URL,
    data: departmentData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

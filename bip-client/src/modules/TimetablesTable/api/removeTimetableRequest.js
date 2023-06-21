import axios from 'axios'
import { TIMETABLES_URL } from '../../../constants/timetablesUrl'

export async function removeTimetableById(id) {
  return axios({
    method: 'DELETE',
    url: `${TIMETABLES_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

import axios from 'axios'
import { SCHEDULES_URL } from '../../../constants/schedulesUrl'

export async function removeScheduleById(id) {
  return axios({
    method: 'DELETE',
    url: `${SCHEDULES_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

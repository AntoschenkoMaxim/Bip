import axios from 'axios'
import { SCHEDULES_URL } from '../constants/schedulesUrl'

export async function getAllSchedules() {
  return axios({
    method: 'GET',
    url: SCHEDULES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

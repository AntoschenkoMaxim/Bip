import { SCHEDULES_URL } from '../constants/schedulesUrl'
import { api } from './interceptors'

export async function getAllSchedules() {
  return api({
    method: 'GET',
    url: SCHEDULES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

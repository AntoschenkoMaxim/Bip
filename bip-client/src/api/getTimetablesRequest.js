import { TIMETABLES_URL } from '../constants/timetablesUrl'
import { api } from './interceptors'

export async function getAllTimetables() {
  return api({
    method: 'GET',
    url: TIMETABLES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

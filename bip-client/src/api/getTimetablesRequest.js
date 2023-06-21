import axios from 'axios'
import { TIMETABLES_URL } from '../constants/timetablesUrl'

export async function getAllTimetables() {
  return axios({
    method: 'GET',
    url: TIMETABLES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

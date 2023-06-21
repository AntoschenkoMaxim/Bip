import axios from 'axios'
import { TIMETABLES_URL } from '../../../constants/timetablesUrl'

export async function createTimetable(timetableData) {
  return axios({
    method: 'POST',
    url: TIMETABLES_URL,
    data: timetableData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

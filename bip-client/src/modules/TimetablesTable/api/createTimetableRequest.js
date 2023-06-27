import { TIMETABLES_URL } from '../../../constants/timetablesUrl'
import { api } from '../../../api/interceptors'

export async function createTimetable(timetableData) {
  return api({
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

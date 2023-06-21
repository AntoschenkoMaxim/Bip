import axios from 'axios'
import { TIMETABLES_URL } from '../../../constants/timetablesUrl'

export async function updateTimetableById(timetableData) {
  const id = timetableData.get('id')
  return axios({
    method: 'PATCH',
    url: `${TIMETABLES_URL}/${id}`,
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

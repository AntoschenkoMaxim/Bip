import { TIMETABLES_URL } from '../../../constants/timetablesUrl'
import { api } from '../../../api/interceptors'

export async function updateTimetableById(timetableData) {
  const id = timetableData.get('id')
  return api({
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

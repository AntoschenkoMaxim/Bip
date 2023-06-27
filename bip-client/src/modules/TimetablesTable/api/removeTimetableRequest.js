import { TIMETABLES_URL } from '../../../constants/timetablesUrl'
import { api } from '../../../api/interceptors'

export async function removeTimetableById(id) {
  return api({
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

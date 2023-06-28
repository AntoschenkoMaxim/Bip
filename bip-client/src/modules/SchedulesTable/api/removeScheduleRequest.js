import { SCHEDULES_URL } from '../../../constants/schedulesUrl'
import { api } from '../../../api/interceptors'

export async function removeScheduleById(id) {
  return api({
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

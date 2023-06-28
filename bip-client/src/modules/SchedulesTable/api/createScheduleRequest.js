import { SCHEDULES_URL } from '../../../constants/schedulesUrl'
import { api } from '../../../api/interceptors'

export async function createSchedule(scheduleData) {
  return api({
    method: 'POST',
    url: SCHEDULES_URL,
    data: scheduleData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

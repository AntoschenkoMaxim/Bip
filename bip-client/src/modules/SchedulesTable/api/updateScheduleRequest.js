import { SCHEDULES_URL } from '../../../constants/schedulesUrl'
import { api } from '../../../api/interceptors'

export async function updateScheduleById(scheduleData) {
  const id = scheduleData.get('id')
  return api({
    method: 'PATCH',
    url: `${SCHEDULES_URL}/${id}`,
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

import axios from 'axios'
import { SCHEDULES_URL } from '../../../constants/schedulesUrl'

export async function updateScheduleById(scheduleData) {
  const id = scheduleData.get('id')
  return axios({
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

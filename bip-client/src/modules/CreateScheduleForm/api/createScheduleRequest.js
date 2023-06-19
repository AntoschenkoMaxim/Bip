import axios from 'axios'
import { SCHEDULES_URL } from '../../../constants/schedulesUrl'

export async function createSchedule(scheduleData) {
  return axios({
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

import axios from 'axios'
import { DATES_URL } from '../../../constants/datesUrl'

export async function createDate(dateData) {
  return axios({
    method: 'POST',
    url: DATES_URL,
    data: dateData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

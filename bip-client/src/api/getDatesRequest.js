import axios from 'axios'
import { DATES_URL } from '../constants/datesUrl'

export async function getAllDates() {
  return axios({
    method: 'GET',
    url: DATES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

import axios from 'axios'
import { DATES_URL } from '../../../constants/datesUrl'

export async function removeDateById(id) {
  return axios({
    method: 'DELETE',
    url: `${DATES_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

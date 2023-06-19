import axios from 'axios'
import { STATEMENTS_URL } from '../../../constants/statementsUrl'

export async function removeStatementById(id) {
  return axios({
    method: 'DELETE',
    url: `${STATEMENTS_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

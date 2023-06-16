import axios from 'axios'
import { STATEMENTS_URL } from '../constants/statementsUrl'

export async function getAllStatements() {
  return axios({
    method: 'GET',
    url: STATEMENTS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

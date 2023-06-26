import { STATEMENTS_URL } from '../constants/statementsUrl'
import { api } from './interceptors'

export async function getAllStatements() {
  return api({
    method: 'GET',
    url: STATEMENTS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

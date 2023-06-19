import axios from 'axios'
import { STATEMENTS_URL } from '../../../constants/statementsUrl'

export async function createStatement(statementData) {
  return axios({
    method: 'POST',
    url: STATEMENTS_URL,
    data: statementData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

import axios from 'axios'
import { ACHIEVEMENTS_URL } from '../../../constants/achievementsUrl'

export async function createAchievement(postData) {
  return axios({
    method: 'POST',
    url: ACHIEVEMENTS_URL,
    data: postData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

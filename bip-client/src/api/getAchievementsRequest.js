import axios from 'axios'
import { ACHIEVEMENTS_URL } from '../constants/achievementsUrl'

export async function getAllAchievements() {
  return axios({
    method: 'GET',
    url: ACHIEVEMENTS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

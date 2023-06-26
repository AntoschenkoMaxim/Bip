import { ACHIEVEMENTS_URL } from '../constants/achievementsUrl'
import { api } from './interceptors'

export async function getAllAchievements() {
  return api({
    method: 'GET',
    url: ACHIEVEMENTS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

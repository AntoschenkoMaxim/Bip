import { ACHIEVEMENTS_URL } from '../../../constants/achievementsUrl'
import { api } from '../../../api/interceptors'

export async function removeAchievementById(id) {
  return api({
    method: 'DELETE',
    url: `${ACHIEVEMENTS_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

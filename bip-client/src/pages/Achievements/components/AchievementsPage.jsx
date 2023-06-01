import { Button, Divider } from 'antd'
import { useState } from 'react'
import { CreateAchievementForm } from '../../../modules/CreateAchievementForm'
import { AchievementsTable } from '../../../modules/AchievementsTable'

export function AchievementsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить достижение</Button>
      <CreateAchievementForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <AchievementsTable />
    </>
  )
}

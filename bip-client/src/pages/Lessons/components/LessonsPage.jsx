import { Button, Divider } from 'antd'
import { useState } from 'react'
import { LessonsTable } from '../../../modules/LessonsTable'
import { CreateLessonForm } from '../../../modules/CreateLessonForm'

export function LessonsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить предмет</Button>
      <CreateLessonForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <LessonsTable />
    </>
  )
}

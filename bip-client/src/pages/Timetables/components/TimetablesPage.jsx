import { Button, Divider } from 'antd'
import { useState } from 'react'
import { TimetablesTable } from '../../../modules/TimetablesTable'
import { CreateTimetableForm } from '../../../modules/CreateTimetableForm'

export function TimetablesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить расписание</Button>
      <CreateTimetableForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <TimetablesTable />
    </>
  )
}

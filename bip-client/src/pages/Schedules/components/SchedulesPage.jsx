import { Button, Divider } from 'antd'
import { useState } from 'react'
import { CreateScheduleForm } from '../../../modules/CreateScheduleForm'
import { SchedulesTable } from '../../../modules/SchedulesTable'

export function SchedulesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить график учебного процесса</Button>
      <CreateScheduleForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <SchedulesTable />
    </>
  )
}

import { Button, Divider } from 'antd'
import { TeachersTable } from '../../../modules/TeachersTable'
import { useState } from 'react'
import { CreateTeacherForm } from '../../../modules/CreateTeacherForm/components/CreateTeacherForm/CreateTeacherForm'

export function TeachersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить преподавателя</Button>
      <CreateTeacherForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <TeachersTable />
    </>
  )
}

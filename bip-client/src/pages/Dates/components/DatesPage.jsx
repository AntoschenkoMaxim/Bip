import { Button, Divider } from 'antd'
import { useState } from 'react'
import { CreateDateForm } from '../../../modules/CreateDateForm'
import { DatesTable } from '../../../modules/DatesTable'

export function DatesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить срок вступления</Button>
      <CreateDateForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <DatesTable />
    </>
  )
}

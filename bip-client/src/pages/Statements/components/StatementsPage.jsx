import { Button, Divider } from 'antd'
import { useState } from 'react'
import { StatementsTable } from '../../../modules/StatementsTable'
import { CreateStatementForm } from '../../../modules/CreateStatementForm'

export function StatementsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить заявление</Button>
      <CreateStatementForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <StatementsTable />
    </>
  )
}

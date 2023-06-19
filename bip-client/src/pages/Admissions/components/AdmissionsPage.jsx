import { Button, Divider } from 'antd'
import { useState } from 'react'
import { CreateAdmissionForm } from '../../../modules/CreateAdmissionForm'
import { AdmissionsTable } from '../../../modules/AdmissionsTable'

export function AdmissionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить порядок приема</Button>
      <CreateAdmissionForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <AdmissionsTable />
    </>
  )
}

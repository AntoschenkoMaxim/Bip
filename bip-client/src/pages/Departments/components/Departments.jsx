import { Button, Divider, Modal } from 'antd'
import { useState } from 'react'
import { DepartmentsTable } from '../../../modules/DepartmentsTable'
import { CreateDepartmentForm } from '../../../modules/CreateDepartmentForm'

export function Departments() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить кафедру</Button>
      <Modal
        title='Создание кафедры'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Закрыть
          </Button>,
          <Button
            form='create_department_form'
            key='submit'
            type='primary'
            htmlType='submit'
          >
            Добавить
          </Button>,
        ]}
      >
        <CreateDepartmentForm handleOk={handleOk} />
      </Modal>
      <Divider />
      <DepartmentsTable />
    </>
  )
}

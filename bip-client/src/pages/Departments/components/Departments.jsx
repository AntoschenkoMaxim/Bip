import { Button, Divider, Modal, Space } from 'antd'
import { useState } from 'react'
import { DepartmentsTable } from '../../../modules/DepartmentsTable'
import { CreateDepartmentForm } from '../../../modules/CreateDepartmentForm'
import { AddLessonForm } from '../../../modules/AddLessonForm'

export function Departments() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const showAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleOkCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const handleOkAddModal = () => {
    setIsAddModalOpen(false)
  }

  const handleCancelCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const handleCancelAddModal = () => {
    setIsAddModalOpen(false)
  }

  const createButtons = [
    <Button key='back' onClick={handleCancelCreateModal}>
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
  ]

  const addButtons = [
    <Button key='back' onClick={handleCancelAddModal}>
      Закрыть
    </Button>,
    <Button
      form='add_lesson_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <>
      <Space>
        <Button onClick={showCreateModal}>Добавить кафедру</Button>
        <Button onClick={showAddModal}>Добавить предмет</Button>
      </Space>
      <Modal
        title='Создание кафедры'
        open={isCreateModalOpen}
        onCancel={handleCancelCreateModal}
        footer={createButtons}
      >
        <CreateDepartmentForm handleOk={handleOkCreateModal} />
      </Modal>
      <Modal
        title='Добавление предмета'
        open={isAddModalOpen}
        onCancel={handleCancelAddModal}
        footer={addButtons}
      >
        <AddLessonForm handleOk={handleOkAddModal} />
      </Modal>
      <Divider />
      <DepartmentsTable />
    </>
  )
}

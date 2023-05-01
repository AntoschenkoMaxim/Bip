import { Button, Divider, Modal, Space } from 'antd'
import { useState } from 'react'
import { DepartmentsTable } from '../../../modules/DepartmentsTable'
import { CreateDepartmentForm } from '../../../modules/CreateDepartmentForm'
import { AddLessonForm } from '../../../modules/AddLessonForm'

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

  const buttons = [
    <Button key='back' onClick={handleCancel}>
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
        <Button onClick={showModal}>Добавить кафедру</Button>
        <Button onClick={showModal}>Добавить предмет</Button>
      </Space>
      <Modal
        title='Создание кафедры'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={buttons}
      >
        {/* <CreateDepartmentForm handleOk={handleOk} /> */}
        <AddLessonForm handleOk={handleOk} />
      </Modal>
      <Divider />
      <DepartmentsTable />
    </>
  )
}

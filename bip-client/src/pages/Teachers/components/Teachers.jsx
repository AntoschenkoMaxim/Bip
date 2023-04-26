import { Button, Divider, Modal } from 'antd'
import { TeachersTable } from '../../../modules/TeachersTable'
import { useState } from 'react'
import { CreateTeacherForm } from '../../../modules/CreateTeacherForm/components/CreateTeacherForm/CreateTeacherForm'

export function Teachers() {
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
      <Button onClick={showModal}>Добавить преподавателя</Button>
      <Modal
        title='Добавление преподавателя'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Закрыть
          </Button>,
          <Button
            form='create_teacher_form'
            key='submit'
            type='primary'
            htmlType='submit'
          >
            Добавить
          </Button>,
        ]}
      >
        <CreateTeacherForm handleOk={handleOk} />
      </Modal>
      <Divider />
      <TeachersTable />
    </>
  )
}

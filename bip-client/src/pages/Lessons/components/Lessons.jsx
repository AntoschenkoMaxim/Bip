import { Button, Divider, Modal } from 'antd'
import { useState } from 'react'
import { LessonsTable } from '../../../modules/LessonsTable'
import { CreateLessonForm } from '../../../modules/CreateLessonForm'

export function Lessons() {
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
      <Button onClick={showModal}>Добавить предмет</Button>
      <Modal
        title='Создание предмета'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Закрыть
          </Button>,
          <Button
            form='create_lesson_form'
            key='submit'
            type='primary'
            htmlType='submit'
          >
            Добавить
          </Button>,
        ]}
      >
        <CreateLessonForm handleOk={handleOk} />
      </Modal>
      <Divider />
      <LessonsTable />
    </>
  )
}

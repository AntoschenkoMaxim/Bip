import { Button, Divider, Modal } from 'antd'
import { useState } from 'react'
import { ImagesTable } from '../../../modules/ImagesTable'
import { CreateImageForm } from '../../../modules/CreateImageForm'

export function Images() {
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
      form='create_image_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <>
      <Button onClick={showModal}>Добавить фотографию</Button>
      <Modal
        title='Добавление фотографии'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={buttons}
      >
        <CreateImageForm handleOk={handleOk} />
      </Modal>
      <Divider />
      <ImagesTable />
    </>
  )
}

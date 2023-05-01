import { Button, Divider, Modal } from 'antd'
import { useState } from 'react'
import { PostsTable } from '../../../modules/PostsTable'
import { CreatePostForm } from '../../../modules/CreatePostForm'

export function Posts() {
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
      form='create_post_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <>
      <Button onClick={showModal}>Добавить новость</Button>
      <Modal
        title='Создание новости'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={buttons}
      >
        <CreatePostForm handleOk={handleOk} />
      </Modal>
      <Divider />
      <PostsTable />
    </>
  )
}

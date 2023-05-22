import { Button, Divider, Modal } from 'antd'
import { useState } from 'react'
import { PostsCategoriesTable } from '../../../modules/PostsCategoriesTable'
import { CreatePostsCategoryForm } from '../../../modules/CreatePostsCategoryForm'

export function PostsCategoriesPage() {
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
      form='create_posts_category_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <>
      <Button onClick={showModal}>Добавить категорию</Button>
      <Modal
        title='Создание категории'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={buttons}
      >
        <CreatePostsCategoryForm handleOk={handleOk} />
      </Modal>
      <Divider />
      <PostsCategoriesTable />
    </>
  )
}

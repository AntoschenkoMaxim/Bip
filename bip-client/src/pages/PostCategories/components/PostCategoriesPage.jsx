import { Button, Divider } from 'antd'
import { useState } from 'react'
import { PostCategoriesTable } from '../../../modules/PostCategoriesTable'
import { CreatePostCategoryForm } from '../../../modules/CreatePostCategoryForm'

export function PostCategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить категорию</Button>
      <CreatePostCategoryForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <PostCategoriesTable />
    </>
  )
}

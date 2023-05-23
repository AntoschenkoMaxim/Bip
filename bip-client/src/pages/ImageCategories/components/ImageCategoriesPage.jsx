import { Button, Divider } from 'antd'
import { useState } from 'react'
import { ImageCategoriesTable } from '../../../modules/ImageCategoriesTable'
import { CreateImageCategoryForm } from '../../../modules/CreateImageCategoryForm'

export function ImageCategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить категорию</Button>
      <CreateImageCategoryForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <ImageCategoriesTable />
    </>
  )
}

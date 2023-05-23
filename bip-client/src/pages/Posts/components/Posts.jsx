import { Button, Divider, Modal } from 'antd'
import { useState } from 'react'
import { PostsTable } from '../../../modules/PostsTable'
import { CreatePostForm } from '../../../modules/CreatePostForm'

export function Posts() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить новость</Button>
      <CreatePostForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <PostsTable />
    </>
  )
}

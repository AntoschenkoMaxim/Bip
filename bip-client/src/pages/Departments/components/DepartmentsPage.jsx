import { Button, Divider, Space } from 'antd'
import { useState } from 'react'
import { DepartmentsTable } from '../../../modules/DepartmentsTable'
import { CreateDepartmentForm } from '../../../modules/CreateDepartmentForm'
import { AddLessonForm } from '../../../modules/AddLessonForm'

export function DepartmentsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const showAddModal = () => {
    setIsAddModalOpen(true)
  }

  return (
    <>
      <Space>
        <Button onClick={showCreateModal}>Добавить кафедру</Button>
        <Button onClick={showAddModal}>Добавить предмет</Button>
      </Space>
      <CreateDepartmentForm
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <AddLessonForm
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <Divider />
      <DepartmentsTable />
    </>
  )
}

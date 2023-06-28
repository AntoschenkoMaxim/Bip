import { Badge, Button, Divider, Image, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { useRemoveAchievementByIdQuery } from '../../hooks/useRemoveAchievementByIdQuery'
import { useGetAllAchievementsQuery } from '../../../../hooks/useGetAllAchievementsQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { AchievementForm } from '../AchievementForm/AchievementForm'
import { useUpdateAchievementByIdQuery } from '../../hooks/useUpdateAchievementByIdQuery'
import { useCreateAchievementQuery } from '../../hooks/useCreateAchievementQuery'

export function AchievementsTable() {
  const { getColumnSearchProps } = useTableFilterAndSearch()

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title', 'заголовку'),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement='topLeft' title={description}>
          {description}
        </Tooltip>
      ),
      ...getColumnSearchProps('description', 'описанию'),
    },
    {
      title: 'Изображение',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image
          src={`${import.meta.env.VITE_BASE_URL}/${image}`}
          alt='image'
          width={100}
        />
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        achievements?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeAchievement}
            showModal={showUpdateModal}
          />
        ) : null,
    },
  ]

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState()

  const showUpdateModal = (record) => {
    setSelectedRecord(record)
    setIsUpdateModalOpen(true)
  }

  const showCreateModal = (id) => {
    setIsCreateModalOpen(true)
  }

  const { data: achievements, isSuccess } = useGetAllAchievementsQuery()

  const { mutate: createAchievement } = useCreateAchievementQuery()

  const { mutate: updateAchievement } = useUpdateAchievementByIdQuery()

  const { mutate: removeAchievement } = useRemoveAchievementByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить достижение</Button>
      <AchievementForm
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание достижения'
        btnTitle='Создать'
        onSubmit={createAchievement}
      />
      <Divider />
      {selectedRecord && (
        <AchievementForm
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование достижения'
          btnTitle='Обновить'
          initialData={{
            title: selectedRecord.title,
            description: selectedRecord.description,
          }}
          onSubmit={updateAchievement}
        />
      )}

      {isSuccess && (
        <Badge count={achievements?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={achievements?.rows}
            pagination={{
              defaultPageSize: '5',
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15],
            }}
          />
        </Badge>
      )}
    </>
  )
}

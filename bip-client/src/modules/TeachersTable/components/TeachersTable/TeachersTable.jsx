import { Badge, Button, Modal, Popconfirm, Space, Table, Tag } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllTeachers } from '../../api/getTeachersRequest'
import { removeTeacherById } from '../../api/removeTeacherRequest'
import { useState } from 'react'
import { getTeacherById } from '../../api/getTeacherRequest'
import { UpdateTeacherForm } from '../UpdateTeacherForm/UpdateTeacherForm'

export function TeachersTable() {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Отчество',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Должность',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Предметы',
      dataIndex: 'lessons',
      key: 'lessons',
      render: (_, { lessons }) => (
        <>
          {lessons.length ? (
            lessons.map((lesson) => {
              return (
                <Tag color='geekblue' key={lesson.value}>
                  {lesson.description.toUpperCase()}
                </Tag>
              )
            })
          ) : (
            <Tag color='volcano'>НЕТ ПРЕДМЕТОВ</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        data?.rows.length >= 1 ? (
          <Space>
            <Popconfirm title='Вы уверены?' onConfirm={() => remove(record.id)}>
              <a>Удалить</a>
            </Popconfirm>
            <a onClick={() => showModal(record.id)}>Изменить</a>
          </Space>
        ) : null,
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState(null)

  const showModal = (id) => {
    setId(id)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setId(null)
    setIsModalOpen(false)
  }

  const client = useQueryClient()

  const { data, isSuccess } = useQuery({
    queryFn: () => getAllTeachers(),
    queryKey: ['teachers'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeTeacherById,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['teachers'] })
      message.success('Преподаватель удален!')
    },
  })

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='update_teacher_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Обновить
    </Button>,
  ]

  return (
    <>
      <Modal
        title='Редактирование преподавателя'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={buttons}
      >
        <UpdateTeacherForm id={id} handleOk={handleOk} />
      </Modal>
      {isSuccess && (
        <Badge count={data?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={data?.rows}
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

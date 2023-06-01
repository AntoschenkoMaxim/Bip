import { Descriptions, Divider, Drawer, Tag, Typography } from 'antd'
import { useGetTeacherByIdQuery } from '../../hooks/useGetTeacherByIdQuery'

export function TeacherDrawer({ teacherId, open, setOpen }) {
  const { data: teacher, isSuccess } = useGetTeacherByIdQuery(teacherId)

  const onClose = () => {
    setOpen(false)
  }

  return (
    <Drawer
      width={640}
      placement='right'
      closable={false}
      onClose={onClose}
      open={open}
    >
      {isSuccess && (
        <>
          <Descriptions title='Информация преподавателя'>
            <Descriptions.Item label='Имя'>
              {teacher?.firstName}
            </Descriptions.Item>
            <Descriptions.Item label='Фамилия'>
              {teacher?.surname}
            </Descriptions.Item>
            <Descriptions.Item label='Отчество'>
              {teacher?.surname}
            </Descriptions.Item>
            <Descriptions.Item label='Ведет предметы'>
              {teacher?.lessons.map((item) => (
                <Tag color='geekblue'>{item.description}</Tag>
              ))}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title='Контактные данные'>
            <Descriptions.Item label='Телефон'>
              <Typography.Link href={`callto:${teacher?.phone}`}>
                {teacher?.phone}
              </Typography.Link>
            </Descriptions.Item>
            <Descriptions.Item label='Email'>
              <Typography.Link href={`mailto:${teacher?.email}`}>
                {teacher?.email}
              </Typography.Link>
            </Descriptions.Item>
            <Descriptions.Item label='Телеграм'>
              <Typography.Link
                href={`https://t.me/${teacher?.telegram}`}
                target='_blank'
              >
                {teacher?.telegram}
              </Typography.Link>
            </Descriptions.Item>
          </Descriptions>
          <Divider />
        </>
      )}
    </Drawer>
  )
}

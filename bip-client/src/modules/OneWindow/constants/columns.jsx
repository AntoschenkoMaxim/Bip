import { Typography } from 'antd'

export const columns = [
  {
    title: 'ФИО',
    dataIndex: 'fullName',
    key: 'fullname',
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
    render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
  },
]

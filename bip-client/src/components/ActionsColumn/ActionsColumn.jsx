import React from 'react'
import { Space, Popconfirm, Button } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

export function ActionsColumn({ record, removeItem, showModal }) {
  return (
    <Space>
      <Popconfirm
        title='Вы уверены?'
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        onConfirm={() => removeItem(record.id)}
        okText='Да'
        cancelText='Нет'
      >
        <Button type='text' danger>
          Удалить
        </Button>
      </Popconfirm>
      <Button type='link' onClick={() => showModal(record)}>
        Изменить
      </Button>
    </Space>
  )
}

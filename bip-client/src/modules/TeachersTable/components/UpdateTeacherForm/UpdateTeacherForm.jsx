import { Form, Input, Select, message } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { validateMessages } from '../../../../constants/validateMessages'
import { formItems } from '../../constants/formItems'
import { getTeacherById } from '../../api/getTeacherRequest'
import { updateTeacherById } from '../../api/updateTeacherRequest'
import { options } from '../../constants/options'
import { useState } from 'react'

export function UpdateTeacherForm({ id, handleOk }) {
  const [form] = Form.useForm()

  const client = useQueryClient()

  const { data: teacherData, isSuccess } = useQuery(
    ['teacher', id],
    getTeacherById
  )

  const { mutate: updateTeacher } = useMutation({
    mutationFn: updateTeacherById,
    onSuccess: () => {
      client.invalidateQueries(['teachers'])
      message.success('Преподаватель обновлен!')
    },
  })

  const getTeacherData = (values) => {
    const teacher = {
      id: id,
      firstName: values.firstName,
      lastName: values.lastName,
      surname: values.surname,
      phone: values.prefix + values.phone,
      role: values.role,
    }
    return teacher
  }

  const handleSubmit = (values) => {
    const teacher = getTeacherData(values)
    updateTeacher(teacher)
    form.resetFields()
    handleOk()
  }

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select defaultValue='375' style={{ width: 80 }}>
        <Option value='375'>+375</Option>
        <Option value='80'>80</Option>
      </Select>
    </Form.Item>
  )

  return (
    <Form
      layout='vertical'
      name='update_teacher_form'
      form={form}
      validateMessages={validateMessages}
      onFinish={handleSubmit}
    >
      <Form.Item
        label='Фамилия'
        name='lastName'
        required
        rules={[{ required: true }]}
      >
        <Input placeholder='Дмитриенко' allowClear />
      </Form.Item>

      <Form.Item
        label='Имя'
        name='firstName'
        required
        rules={[{ required: true }]}
      >
        <Input placeholder='Дмитрий' allowClear />
      </Form.Item>

      <Form.Item
        label='Отчество'
        name='surname'
        required
        rules={[{ required: true }]}
      >
        <Input placeholder='Дмитриевич' allowClear />
      </Form.Item>

      <Form.Item
        label='Номер телефона'
        name='phone'
        required
        rules={[
          { required: true },
          {
            pattern: /^(29|25|44|33)(\d{3})(\d{2})(\d{2})$/,
            message: 'Не соответствует формату!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          placeholder='295553535'
          allowClear
        />
      </Form.Item>

      <Form.Item
        label='Должность'
        name='role'
        required
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder='Искать'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option?.label ?? '').includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={options}
        />
      </Form.Item>
    </Form>
  )
}

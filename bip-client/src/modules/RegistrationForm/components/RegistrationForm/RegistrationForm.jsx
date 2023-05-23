import { Card, Form, Input, Steps } from 'antd'
import { useState } from 'react'
import { steps } from '../../constants/steps'
import { validateMessages } from '../../../../constants/validateMessages'
import { RegistrationButtons } from '../RegistrationButtons/RegistrationButtons'
import { useNavigate } from 'react-router-dom'
import { useRegistrationQuery } from '../../hooks/useRegistrationQuery'

export function RegistrationForm() {
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)

  const navigate = useNavigate()

  const { mutate: registration } = useRegistrationQuery()

  const getRegistrationData = (values) => {
    const email = form.getFieldValue('email')
    const password = form.getFieldValue('password')
    const registrationData = {
      email: email,
      password: password,
      firstName: values.firstName,
      lastName: values.lastName,
      surname: values.surname,
    }
    return registrationData
  }

  const handleSubmit = (values) => {
    const registrationData = getRegistrationData(values)
    registration(registrationData)
    setCurrent(0)
    form.resetFields()
    navigate('/dashboard')
  }

  const items = steps.map((step) => ({
    key: step.title,
    title: step.title,
  }))

  const next = () => {
    form
      .validateFields()
      .then(() => setCurrent(current + 1))
      .catch((errorInfo) => console.log(errorInfo))
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  return (
    <Card
      title='Sign Up'
      bordered={true}
      style={{
        width: 300,
      }}
    >
      <Steps
        direction='horizontal'
        responsive={false}
        current={current}
        items={items}
        style={{
          marginBottom: 8,
        }}
      />

      <Form
        layout='vertical'
        name='registration_form'
        form={form}
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        {current === 0 && (
          <>
            <Form.Item
              label='Email'
              name='email'
              required
              rules={[{ required: true }, { type: 'email' }]}
            >
              <Input placeholder='andrew@gmail.com' allowClear />
            </Form.Item>

            <Form.Item
              name='password'
              label='Password'
              required
              rules={[{ required: true }]}
            >
              <Input.Password placeholder='password' allowClear />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Password mismatch.'))
                  },
                }),
              ]}
            >
              <Input.Password placeholder='confirm password' />
            </Form.Item>
          </>
        )}
        {current === 1 && (
          <>
            <Form.Item
              label='First Name'
              name='firstName'
              required
              rules={[{ required: true }]}
            >
              <Input placeholder='Andrey' allowClear />
            </Form.Item>

            <Form.Item
              label='Last name'
              name='lastName'
              required
              rules={[{ required: true }]}
            >
              <Input placeholder='Andreenko' allowClear />
            </Form.Item>

            <Form.Item
              label='Surname'
              name='surname'
              required
              rules={[{ required: true }]}
            >
              <Input placeholder='Andreevich' allowClear />
            </Form.Item>
          </>
        )}
        <RegistrationButtons current={current} next={next} prev={prev} />
      </Form>
    </Card>
  )
}

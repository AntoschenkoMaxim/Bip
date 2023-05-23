import { Button, Card, Form, Input } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useNavigate } from 'react-router-dom'
import { useLoginQuery } from '../../hooks/useLoginQuery'

export function LoginForm() {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const { mutate: login } = useLoginQuery()

  const handleSubmit = (values) => {
    login(values)
    form.resetFields()
    navigate('/dashboard')
  }

  return (
    <Card
      title='Sign In'
      bordered={true}
      style={{
        width: 300,
      }}
    >
      <Form
        layout='vertical'
        name='login_form'
        form={form}
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Email'
          name='email'
          required
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input placeholder='andrew@gmail.com' allowClear />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          required
          rules={[{ required: true }]}
        >
          <Input.Password placeholder='password' allowClear />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button block type='primary' htmlType='submit'>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

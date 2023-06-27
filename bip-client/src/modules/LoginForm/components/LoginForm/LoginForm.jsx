import { Button, Card, Col, Form, Input, Row, Space } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useLoginQuery } from '../../hooks/useLoginQuery'
import { Link } from 'react-router-dom'

export function LoginForm({ onLogin }) {
  const [form] = Form.useForm()

  const { mutate: login } = useLoginQuery()

  const handleSubmit = (values) => {
    const accessToken = login(values)
    console.log(accessToken)
    onLogin(accessToken)
    form.resetFields()
  }

  return (
    <Card
      title='Авторизация'
      bordered={true}
      style={{
        width: 400,
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
          label='Пароль'
          name='password'
          required
          rules={[{ required: true }]}
        >
          <Input.Password placeholder='password' allowClear />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Row style={{ marginBottom: 8 }}>
            <Button block type='primary' htmlType='submit'>
              Авторизоваться
            </Button>
          </Row>
          <Row>
            <Button block type='link'>
              <Link to={'/auth/registration'}>Зарегистрироваться</Link>
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  )
}

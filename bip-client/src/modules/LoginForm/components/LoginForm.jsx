import { Button, Card, Form, Input } from 'antd'
import { useQueryClient, useMutation } from 'react-query'
import { loginUser } from '../api/loginRequest'

export function LoginForm() {
  const [form] = Form.useForm()

  const client = useQueryClient()
  const { mutate: login } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['login'],
      })
    },
  })

  const handleSubmit = (values) => {
    login(values)
    form.resetFields()
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
        name='login_form'
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Email'
          name='email'
          required
          rules={[
            {
              required: true,
              message: '${label} is required!',
            },
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '${label} incorrect!',
            },
          ]}
        >
          <Input placeholder='andrew@gmail.com' allowClear />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          required
          rules={[{ required: true, message: 'Please input your password!' }]}
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

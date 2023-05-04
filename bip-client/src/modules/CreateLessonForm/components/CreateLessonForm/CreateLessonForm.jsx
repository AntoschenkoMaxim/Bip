import { Form, Input, Select, message } from 'antd'
import { formItems } from '../../constants/formItems'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createLesson } from '../../api/createLessonRequest'
import { validateMessages } from '../../../../constants/validateMessages'
import { getAllTeachers } from '../../api/getTeachersRequest'

export function CreateLessonForm({ handleOk }) {
  const [form] = Form.useForm()

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

  const options = data?.rows.map((item) => ({
    value: item.id,
    label: `${item.firstName} ${item.surname} ${item.lastName} (${item.role})`,
  }))

  const { mutate: create } = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      client.invalidateQueries(['lessons'])
      message.success('Предмет добавлен!')
    },
  })

  const handleSubmit = (values) => {
    create(values)
    form.resetFields()
    handleOk()
  }

  return (
    <Form
      layout='vertical'
      name='create_lesson_form'
      form={form}
      validateMessages={validateMessages}
      onFinish={handleSubmit}
    >
      {formItems.map((item) => (
        <Form.Item
          key={item.name}
          label={item.label}
          name={item.name}
          required
          rules={[{ required: true }]}
        >
          <Input placeholder={item.placeholder} allowClear />
        </Form.Item>
      ))}
      <Form.Item
        label='Преподаватель'
        name='teacherId'
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
          options={isSuccess && options}
        />
      </Form.Item>
    </Form>
  )
}

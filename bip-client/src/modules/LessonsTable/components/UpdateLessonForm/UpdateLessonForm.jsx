import { Form, Input, Select, message } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { validateMessages } from '../../../../constants/validateMessages'
import { updateLessonById } from '../../api/updateLessonRequest'
import { getAllTeachers } from '../../api/getTeachersRequest'

export function UpdateLessonForm({ id, handleOk }) {
  const [form] = Form.useForm()

  const client = useQueryClient()

  const { mutate: updateLesson } = useMutation({
    mutationFn: updateLessonById,
    onSuccess: () => {
      client.invalidateQueries(['lessons'])
      message.success('Предмет обновлен!')
    },
  })

  const { data: teachersData, isSuccess } = useQuery({
    queryFn: () => getAllTeachers(),
    queryKey: ['teachers'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const options = teachersData?.rows.map((item) => ({
    value: item.id,
    label: `${item.firstName} ${item.surname} ${item.lastName} (${item.role})`,
  }))

  const getLessonData = (values) => {
    const lesson = {
      id: id,
      value: values.value,
      description: values.description,
      teacherId: values.teacherId,
    }
    return lesson
  }

  const handleSubmit = (values) => {
    const lesson = getLessonData(values)
    updateLesson(lesson)
    form.resetFields()
    handleOk()
  }

  return (
    <Form
      layout='vertical'
      name='update_lesson_form'
      form={form}
      validateMessages={validateMessages}
      onFinish={handleSubmit}
    >
      <Form.Item
        label='Значение'
        name='value'
        required
        rules={[{ required: true }]}
      >
        <Input placeholder='new' allowClear />
      </Form.Item>

      <Form.Item
        label='Описание'
        name='description'
        required
        rules={[{ required: true }]}
      >
        <Input placeholder='Новые' allowClear />
      </Form.Item>
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

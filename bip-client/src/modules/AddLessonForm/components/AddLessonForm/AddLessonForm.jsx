import { Form, Input, Select } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addLessonToDepartment } from '../../api/addLessonRequest'
import { getAllLessons } from '../../api/getLessonsRequest'
import { getAllDepartments } from '../../api/getDepartmentsRequest'

export function AddLessonForm({ handleOk }) {
  const [form] = Form.useForm()

  const client = useQueryClient()

  const { data: lessons, isSuccess: isLessonsSuccess } = useQuery({
    queryFn: () => getAllLessons(),
    queryKey: ['lessons'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const lessonsOptions = lessons?.rows.map((lesson) => ({
    value: lesson.id,
    label: lesson.description,
  }))

  const { data: departments, isSuccess: isDepartmentsSuccess } = useQuery({
    queryFn: () => getAllDepartments(),
    queryKey: ['departments'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  const departmentsOptions = departments?.rows.map((department) => ({
    value: department.id,
    label: department.description,
  }))

  const { mutate: add } = useMutation({
    mutationFn: addLessonToDepartment,
    onSuccess: () => {
      client.invalidateQueries(['departments'])
    },
  })

  const handleSubmit = (values) => {
    add(values)
    form.resetFields()
    handleOk()
  }

  return (
    <Form
      layout='vertical'
      name='add_lesson_form'
      form={form}
      validateMessages={validateMessages}
      onFinish={handleSubmit}
    >
      <Form.Item
        label='Предмет'
        name='lessonId'
        required
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder='Предмет'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option?.label ?? '').includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={isLessonsSuccess && lessonsOptions}
        />
      </Form.Item>
      <Form.Item
        label='Кафедра'
        name='departmentId'
        required
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder='Кафедра'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option?.label ?? '').includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={isDepartmentsSuccess && departmentsOptions}
        />
      </Form.Item>
    </Form>
  )
}

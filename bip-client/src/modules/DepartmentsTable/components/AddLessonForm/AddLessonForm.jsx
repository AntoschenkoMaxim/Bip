import { Button, Form, Modal, Select } from 'antd'
import { validateMessages } from '../../../../constants/validateMessages'
import { useAddLessonToDepartmentQuery } from '../../hooks/useAddLessonToDepartmentQuery'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import {
  DEPARTMENTS_LESSON_URL,
  DEPARTMENTS_URL,
  LESSONS_URL,
} from '../../../../constants/urls'
import {
  DEPARTMENTS_KEY,
  DEPARTMENTS_LESSON_KEY,
  LESSONS_KEY,
} from '../../../../constants/keys'

export function AddLessonForm({ isAddModalOpen, setIsAddModalOpen }) {
  const [form] = Form.useForm()

  const handleCancel = () => {
    setIsAddModalOpen(false)
  }

  const handleOk = () => {
    setIsAddModalOpen(false)
  }

  const { data: lessons, isSuccess: isLessonsSuccess } = useGetAllItemsQuery(
    LESSONS_URL,
    LESSONS_KEY
  )

  const lessonsOptions = lessons?.rows.map((lesson) => ({
    value: lesson.id,
    label: lesson.description,
  }))

  const { data: departments, isSuccess: isDepartmentsSuccess } =
    useGetAllItemsQuery(DEPARTMENTS_URL, DEPARTMENTS_KEY)

  const departmentsOptions = departments?.rows.map((department) => ({
    value: department.id,
    label: department.description,
  }))

  const { mutate: addLesson } = useAddLessonToDepartmentQuery(
    DEPARTMENTS_LESSON_URL,
    DEPARTMENTS_LESSON_KEY
  )

  const handleSubmit = (values) => {
    addLesson(values)
    form.resetFields()
    handleOk()
  }

  const buttons = [
    <Button key='back' onClick={handleCancel}>
      Закрыть
    </Button>,
    <Button
      form='add_lesson_form'
      key='submit'
      type='primary'
      htmlType='submit'
    >
      Добавить
    </Button>,
  ]

  return (
    <Modal
      title='Добавление предмета'
      open={isAddModalOpen}
      onCancel={handleCancel}
      footer={buttons}
    >
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
    </Modal>
  )
}

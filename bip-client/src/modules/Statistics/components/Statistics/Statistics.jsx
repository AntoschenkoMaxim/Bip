import { Card, Col, Row } from 'antd'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import {
  ACHIEVEMENTS_KEY,
  ADMISSIONS_KEY,
  DATES_KEY,
  DEPARTMENTS_KEY,
  IMAGES_KEY,
  IMAGE_CATEGORIES_KEY,
  LESSONS_KEY,
  POSTS_KEY,
  POST_CATEGORIES_KEY,
  PRICES_KEY,
  SCHEDULES_KEY,
  STATEMENTS_KEY,
  TEACHERS_KEY,
  TIMETABLES_KEY,
} from '../../../../constants/keys'
import {
  ACHIEVEMENTS_URL,
  ADMISSIONS_URL,
  DATES_URL,
  DEPARTMENTS_URL,
  IMAGES_URL,
  IMAGE_CATEGORIES_URL,
  LESSONS_URL,
  POSTS_URL,
  POST_CATEGORIES_URL,
  PRICES_URL,
  SCHEDULES_URL,
  STATEMENTS_URL,
  TEACHERS_URL,
  TIMETABLES_URL,
} from '../../../../constants/urls'

export function Statistics() {
  const { data: departments } = useGetAllItemsQuery(
    DEPARTMENTS_URL,
    DEPARTMENTS_KEY
  )
  const { data: lessons } = useGetAllItemsQuery(LESSONS_URL, LESSONS_KEY)
  const { data: teachers } = useGetAllItemsQuery(TEACHERS_URL, TEACHERS_KEY)
  const { data: postCategories } = useGetAllItemsQuery(
    POST_CATEGORIES_URL,
    POST_CATEGORIES_KEY
  )
  const { data: posts } = useGetAllItemsQuery(POSTS_URL, POSTS_KEY)
  const { data: imageCategories } = useGetAllItemsQuery(
    IMAGE_CATEGORIES_URL,
    IMAGE_CATEGORIES_KEY
  )
  const { data: images } = useGetAllItemsQuery(IMAGES_URL, IMAGES_KEY)
  const { data: timetables } = useGetAllItemsQuery(
    TIMETABLES_URL,
    TIMETABLES_KEY
  )
  const { data: achievements } = useGetAllItemsQuery(
    ACHIEVEMENTS_URL,
    ACHIEVEMENTS_KEY
  )
  const { data: statements } = useGetAllItemsQuery(
    STATEMENTS_URL,
    STATEMENTS_KEY
  )
  const { data: dates } = useGetAllItemsQuery(DATES_URL, DATES_KEY)
  const { data: admissions } = useGetAllItemsQuery(
    ADMISSIONS_URL,
    ADMISSIONS_KEY
  )
  const { data: schedules } = useGetAllItemsQuery(SCHEDULES_URL, SCHEDULES_KEY)
  const { data: prices } = useGetAllItemsQuery(PRICES_URL, PRICES_KEY)

  const statistics = [
    {
      title: 'Кафедры',
      description: 'Количество кафедр:',
      count: departments?.count,
    },
    {
      title: 'Предметы',
      description: 'Количество предметов:',
      count: lessons?.count,
    },
    {
      title: 'Преподаватели',
      description: 'Количество преподавателей:',
      count: teachers?.count,
    },
    {
      title: 'Категории новостей',
      description: 'Количество категорий:',
      count: postCategories?.count,
    },
    {
      title: 'Новости',
      description: 'Количество новостей:',
      count: posts?.count,
    },
    {
      title: 'Категории изображений',
      description: 'Количество категорий:',
      count: imageCategories?.count,
    },
    {
      title: 'Изображения',
      description: 'Количество изображений:',
      count: images?.count,
    },
    {
      title: 'Расписание',
      description: 'Количество расписаний:',
      count: timetables?.count,
    },
    {
      title: 'Достижения',
      description: 'Количество достижений:',
      count: achievements?.count,
    },
    {
      title: 'Заявления',
      description: 'Количество заявлений:',
      count: statements?.count,
    },
    {
      title: 'Сроки поступления',
      description: 'Количество:',
      count: dates?.count,
    },
    {
      title: 'Порядок приема',
      description: 'Количество:',
      count: admissions?.count,
    },
    {
      title: 'График учебного процесса',
      description: 'Количество:',
      count: schedules?.count,
    },
    {
      title: 'Стоимость обучения',
      description: 'Количество:',
      count: prices?.count,
    },
  ]

  return (
    <div>
      <Row gutter={16}>
        {statistics.map((item, index) => (
          <Col key={index} span={8}>
            <Card title={item.title} style={{ marginBottom: 16 }}>
              <p>
                {item.description} {item.count}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

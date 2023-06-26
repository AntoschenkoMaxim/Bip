import { Card, Col, Row } from 'antd'
import { useGetAllDepartmentsQuery } from '../../../../hooks/useGetAllDepartmentsQuery'
import { useGetAllLessonsQuery } from '../../../../hooks/useGetAllLessonsQuery'
import { useGetAllTeachersQuery } from '../../../../hooks/useGetAllTeachersQuery'
import { useGetAllPostsQuery } from '../../../../hooks/useGetAllPostsQuery'
import { useGetAllPostCategoriesQuery } from '../../../../hooks/useGetAllPostCategoriesQuery'
import { useGetAllImageCategoriesQuery } from '../../../../hooks/useGetAllImageCategories'
import { useGetAllImagesQuery } from '../../../../hooks/useGetAllImagesQuery'
import { useGetAllTimetablesQuery } from '../../../../hooks/useGetAllTimetablesQuery'
import { useGetAllAchievementsQuery } from '../../../../hooks/useGetAllAchievementsQuery'
import { useGetAllStatementsQuery } from '../../../../hooks/useGetAllStatementsQuery'
import { useGetAllDatesQuery } from '../../../../hooks/useGetAllDatesQuery'
import { useGetAllAdmissionsQuery } from '../../../../hooks/useGetAllAdmissionsQuery'
import { useGetAllSchedulesQuery } from '../../../../hooks/useGetAllSchedulesQuery'
import { useGetAllPricesQuery } from '../../../../hooks/useGetAllPricesQuery'

export function Statistics() {
  const { data: departments } = useGetAllDepartmentsQuery()
  const { data: lessons } = useGetAllLessonsQuery()
  const { data: teachers } = useGetAllTeachersQuery()
  const { data: postCategories } = useGetAllPostCategoriesQuery()
  const { data: posts } = useGetAllPostsQuery()
  const { data: imageCategories } = useGetAllImageCategoriesQuery()
  const { data: images } = useGetAllImagesQuery()
  const { data: timetables } = useGetAllTimetablesQuery()
  const { data: achievements } = useGetAllAchievementsQuery()
  const { data: statements } = useGetAllStatementsQuery()
  const { data: dates } = useGetAllDatesQuery()
  const { data: admissions } = useGetAllAdmissionsQuery()
  const { data: schedules } = useGetAllSchedulesQuery()
  const { data: prices } = useGetAllPricesQuery()

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

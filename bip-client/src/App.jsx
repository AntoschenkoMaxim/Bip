import { Route, Routes } from 'react-router-dom'
import { LoginForm } from './modules/LoginForm/components/LoginForm/LoginForm'
import { RegistrationForm } from './modules/RegistrationForm/components/RegistrationForm/RegistrationForm'
import { ImagesPage } from './pages/Images/components/ImagesPage'
import { DashboardLayoutPage } from './pages/DashboardLayout/components/DashboardLayoutPage'
import { MainLayoutPage } from './pages/MainLayout/components/MainLayoutPage'
import { MainPostsPage } from './pages/MainPosts/components/MainPostsPage'
import { AccreditationPage } from './pages/Accreditation/components/AccreditationPage'
import { OneWindowPage } from './pages/OneWindow/components/OneWindowPage'
import { LibraryPage } from './pages/Library/components/LibraryPage'
import { ImageCategoriesPage } from './pages/ImageCategories/components/ImageCategoriesPage'
import { PostCategoriesPage } from './pages/PostCategories/components/PostCategoriesPage'
import { LessonsPage } from './pages/Lessons/components/LessonsPage'
import { TeachersPage } from './pages/Teachers/components/TeachersPage'
import { DepartmentsPage } from './pages/Departments/components/DepartmentsPage'
import { PostsPage } from './pages/Posts/components/PostsPage'
import { MainSider } from './modules/MainSider'
import { getItem } from './helpers/getItem'
import { useTranslation } from 'react-i18next'
import { Documents } from './modules/Documents'
import { Dates } from './modules/Dates'
import { History } from './modules/History'
import { Price } from './modules/Price'
import { Departments } from './modules/Departments'
import { Brsm } from './modules/Brsm'
import { EducationalDepartment } from './modules/EducationalDepartment/components/EducationalDepartment/EducationalDepartment'
import { Schedule } from './modules/Schedule'
import { Statements } from './modules/Statements'
import { Regulations } from './modules/Regulations'
import { Consultation } from './modules/Consultation'
import { Images } from './modules/Images'

import {
  BookOutlined,
  CrownOutlined,
  ContainerOutlined,
  PhoneOutlined,
  UsergroupAddOutlined,
  AuditOutlined,
  CalendarOutlined,
  FileExclamationOutlined,
  FileDoneOutlined,
  FileWordOutlined,
  DollarOutlined,
  SolutionOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import { AchievementsPage } from './pages/Achievements/components/AchievementsPage'
import { Achievements } from './modules/Achievements'
import { Admissions } from './modules/Admissions'
import { Projects } from './modules/Projects'
import { StudentRules } from './modules/StudentRules'

function App() {
  const { i18n } = useTranslation()

  const icons1 = [
    <ContainerOutlined />,
    <FileImageOutlined />,
    <UsergroupAddOutlined />,
    <AuditOutlined />,
    <BookOutlined />,
    <PhoneOutlined />,
  ]

  const items1 = i18n
    .t('sider_menu.main', { returnObjects: true })
    .map((item, index) =>
      getItem(
        item.title,
        item.path,
        icons1[index],
        item.sub_menu?.map((sub) => getItem(sub.title, sub.path))
      )
    )

  const icons2 = [
    <CalendarOutlined />,
    <FileExclamationOutlined />,
    <FileDoneOutlined />,
  ]

  const items2 = i18n
    .t('sider_menu.about', { returnObjects: true })
    .map((item, index) => getItem(item.title, item.path, icons2[index]))

  const icons3 = [
    <CalendarOutlined />,
    <FileExclamationOutlined />,
    <FileDoneOutlined />,
    <FileWordOutlined />,
  ]

  const items3 = i18n
    .t('sider_menu.applicant', { returnObjects: true })
    .map((item, index) => getItem(item.title, item.path, icons3[index]))

  const icons4 = [
    <CalendarOutlined />,
    <FileExclamationOutlined />,
    <SolutionOutlined />,
    <DollarOutlined />,
  ]

  const items4 = i18n
    .t('sider_menu.student', { returnObjects: true })
    .map((item, index) => getItem(item.title, item.path, icons4[index]))

  const icons5 = [<CrownOutlined />]

  const items5 = i18n
    .t('sider_menu.achievements', { returnObjects: true })
    .map((item, index) => getItem(item.title, item.path, icons5[index]))

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayoutPage />}>
          <Route path='/*' element={<MainSider items={items1} />}>
            <Route index element={<MainPostsPage />} />
            <Route path='gallery' element={<Images />} />
            <Route path='projects' element={<Projects />} />
            <Route path='brsm' element={<Brsm />} />
            <Route path='consultation' element={<Consultation />} />
            <Route path='regulations' element={<Regulations />} />
            <Route path='library' element={<LibraryPage />} />
            <Route path='contacts' element={<OneWindowPage />} />
            <Route path='statements' element={<Statements />} />
            <Route
              path='educational-department'
              element={<EducationalDepartment />}
            />
          </Route>
          <Route path='about/*' element={<MainSider items={items2} />}>
            <Route index element={<History />} />
            <Route path='departments' element={<Departments />} />
            <Route path='accreditation' element={<AccreditationPage />} />
          </Route>
          <Route path='applicant/*' element={<MainSider items={items3} />}>
            <Route index element={<Dates />} />
            <Route path='documents' element={<Documents />} />
            <Route path='admission' element={<Admissions />} />
          </Route>
          <Route path='student/*' element={<MainSider items={items4} />}>
            <Route path='rules' element={<StudentRules />} />
            <Route path='schedule' element={<Schedule />} />
            <Route path='price' element={<Price />} />
          </Route>
          <Route path='achievements/*' element={<MainSider items={items5} />}>
            <Route index element={<Achievements />} />
          </Route>
        </Route>
        <Route path='/auth/login' element={<LoginForm />} />
        <Route path='/auth/registration' element={<RegistrationForm />} />
        <Route path='/dashboard' element={<DashboardLayoutPage />}>
          <Route index element={<LoginForm />} />
          <Route path='teachers' element={<TeachersPage />} />
          <Route path='departments' element={<DepartmentsPage />} />
          <Route path='lessons' element={<LessonsPage />} />
          <Route path='post-categories' element={<PostCategoriesPage />} />
          <Route path='posts' element={<PostsPage />} />
          <Route path='image-categories' element={<ImageCategoriesPage />} />
          <Route path='images' element={<ImagesPage />} />
          <Route path='achievements' element={<AchievementsPage />} />
        </Route>
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App

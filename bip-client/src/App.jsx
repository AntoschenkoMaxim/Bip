import { Route, Routes, Navigate } from 'react-router-dom'
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
  BarChartOutlined,
  InboxOutlined,
  FileProtectOutlined,
  PictureOutlined,
  StarOutlined,
  TeamOutlined,
  ProfileOutlined,
  FileTextOutlined,
  OrderedListOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons'
import { AchievementsPage } from './pages/Achievements/components/AchievementsPage'
import { Achievements } from './modules/Achievements'
import { Admissions } from './modules/Admissions'
import { Projects } from './modules/Projects'
import { StudentRules } from './modules/StudentRules'
import { StatementsPage } from './pages/Statements/components/StatementsPage'
import { DatesPage } from './pages/Dates/components/DatesPage'
import { AdmissionsPage } from './pages/Admissions/components/AdmissionsPage'
import { SchedulesPage } from './pages/Schedules/components/SchedulesPage'
import { Timetables } from './modules/Timetables'
import { TimetablesPage } from './pages/Timetables/components/TimetablesPage'
import { PricesPage } from './pages/Prices/components/PricesPage'
import { Reception } from './modules/Reception'
import { LandingPage } from './pages/Landing/components/LandingPage'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Statistics } from './modules/Statistics'
import { RegistrationPage } from './pages/Registration/components/RegistrationPage'
import { LoginPage } from './pages/Login/components/LoginPage'
import { Error404Page } from './pages/Error404/components/Error404Page'

function App() {
  const { t } = useTranslation()

  const icons1 = [
    <ContainerOutlined />,
    <FileImageOutlined />,
    <UsergroupAddOutlined />,
    <AuditOutlined />,
    <BookOutlined />,
    <PhoneOutlined />,
  ]

  const items1 = t('sider_menu.main', { returnObjects: true }).map(
    (item, index) =>
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

  const items2 = t('sider_menu.about', { returnObjects: true }).map(
    (item, index) => getItem(item.title, item.path, icons2[index])
  )

  const icons3 = [
    <CalendarOutlined />,
    <FileExclamationOutlined />,
    <FileDoneOutlined />,
    <FileWordOutlined />,
  ]

  const items3 = t('sider_menu.applicant', { returnObjects: true }).map(
    (item, index) => getItem(item.title, item.path, icons3[index])
  )

  const icons4 = [
    <CalendarOutlined />,
    <FileExclamationOutlined />,
    <SolutionOutlined />,
    <DollarOutlined />,
  ]

  const items4 = t('sider_menu.student', { returnObjects: true }).map(
    (item, index) => getItem(item.title, item.path, icons4[index])
  )

  const icons5 = [<CrownOutlined />]

  const items5 = t('sider_menu.achievements', { returnObjects: true }).map(
    (item, index) => getItem(item.title, item.path, icons5[index])
  )

  const dashboardIcons = [
    <BarChartOutlined />,
    <InboxOutlined />,
    <ProfileOutlined />,
    <TeamOutlined />,
    <FileProtectOutlined />,
    <PictureOutlined />,
    <FieldTimeOutlined />,
    <StarOutlined />,
    <FileTextOutlined />,
    <CalendarOutlined />,
    <OrderedListOutlined />,
    <ContainerOutlined />,
    <DollarOutlined />,
  ]

  const dashboardItems = t('dashboard_menu.main', { returnObjects: true }).map(
    (item, index) =>
      getItem(
        item.title,
        item.path,
        dashboardIcons[index],
        item.sub_menu?.map((sub) => getItem(sub.title, sub.path))
      )
  )

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleRegistration = (accessToken) => {
    Cookies.set('accessToken', accessToken)
    setIsLoggedIn(true)
  }

  const handleLogin = (accessToken) => {
    Cookies.set('accessToken', accessToken)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    Cookies.remove('accessToken')
    setIsLoggedIn(false)
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayoutPage />}>
          <Route index element={<LandingPage />} />
          <Route path='posts/*' element={<MainSider items={items1} />}>
            <Route index element={<MainPostsPage />} />
            <Route path='gallery' element={<Images />} />
            <Route path='projects' element={<Projects />} />
            <Route path='brsm' element={<Brsm />} />
            <Route path='consultation' element={<Consultation />} />
            <Route path='regulations' element={<Regulations />} />
            <Route path='library' element={<LibraryPage />} />
            <Route path='contacts' element={<OneWindowPage />} />
            <Route path='statements' element={<Statements />} />
            <Route path='reception' element={<Reception />} />
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
            {/* <Route path='rules' element={<Rules />} /> */}
            <Route path='documents' element={<Documents />} />
            <Route path='admission' element={<Admissions />} />
          </Route>
          <Route path='student/*' element={<MainSider items={items4} />}>
            <Route index element={<Timetables />} />
            <Route path='rules' element={<StudentRules />} />
            <Route path='schedule' element={<Schedule />} />
            <Route path='price' element={<Price />} />
          </Route>
          <Route path='achievements/*' element={<MainSider items={items5} />}>
            <Route index element={<Achievements />} />
          </Route>
        </Route>
        {isLoggedIn ? (
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        ) : (
          <Route
            path='/auth/login'
            element={<LoginPage onLogin={handleLogin} />}
          />
        )}
        <Route
          path='/auth/registration'
          element={<RegistrationPage onRegistration={handleRegistration} />}
        />
        {isLoggedIn ? (
          <Route
            path='/dashboard'
            element={
              <DashboardLayoutPage
                items={dashboardItems}
                onLogout={handleLogout}
              />
            }
          >
            <Route index element={<Statistics />} />
            <Route path='teachers' element={<TeachersPage />} />
            <Route path='departments' element={<DepartmentsPage />} />
            <Route path='lessons' element={<LessonsPage />} />
            <Route path='post-categories' element={<PostCategoriesPage />} />
            <Route path='posts' element={<PostsPage />} />
            <Route path='image-categories' element={<ImageCategoriesPage />} />
            <Route path='images' element={<ImagesPage />} />
            <Route path='timetables' element={<TimetablesPage />} />
            <Route path='achievements' element={<AchievementsPage />} />
            <Route path='statements' element={<StatementsPage />} />
            <Route path='dates' element={<DatesPage />} />
            <Route path='admissions' element={<AdmissionsPage />} />
            <Route path='schedules' element={<SchedulesPage />} />
            <Route path='prices' element={<PricesPage />} />
          </Route>
        ) : (
          <Route
            path='/dashboard'
            element={<Navigate to='/auth/login' replace />}
          />
        )}

        <Route path='*' element={<Error404Page />} />
      </Routes>
    </>
  )
}

export default App

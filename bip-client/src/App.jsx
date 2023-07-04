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
import { Rules } from './modules/Rules'
import {
  aboutIcons,
  achievementsIcons,
  applicantIcons,
  dashboardIcons,
  postsIcons,
  studentIcons,
} from './constants/icons'

function App() {
  const { t } = useTranslation()

  const postsItems = t('sider_menu.main', { returnObjects: true }).map(
    (item, index) =>
      getItem(
        item.title,
        item.path,
        postsIcons[index],
        item.sub_menu?.map((sub) => getItem(sub.title, sub.path))
      )
  )

  const aboutItems = t('sider_menu.about', { returnObjects: true }).map(
    (item, index) => getItem(item.title, item.path, aboutIcons[index])
  )

  const applicantItems = t('sider_menu.applicant', { returnObjects: true }).map(
    (item, index) => getItem(item.title, item.path, applicantIcons[index])
  )

  const studentItems = t('sider_menu.student', { returnObjects: true }).map(
    (item, index) => getItem(item.title, item.path, studentIcons[index])
  )

  const achievementsItems = t('sider_menu.achievements', {
    returnObjects: true,
  }).map((item, index) =>
    getItem(item.title, item.path, achievementsIcons[index])
  )

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

  const handleAuthorization = (accessToken) => {
    Cookies.set('accessToken', accessToken)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    Cookies.remove('accessToken')
    setIsLoggedIn(false)
  }

  const routes = [
    {
      path: 'posts/*',
      items: postsItems,
      subRoutes: [
        { component: <MainPostsPage />, index: true },
        { path: 'gallery', component: <Images /> },
        { path: 'projects', component: <Projects /> },
        { path: 'brsm', component: <Brsm /> },
        { path: 'consultation', component: <Consultation /> },
        { path: 'regulations', component: <Regulations /> },
        { path: 'library', component: <LibraryPage /> },
        { path: 'contacts', component: <OneWindowPage /> },
        { path: 'statements', component: <Statements /> },
        { path: 'reception', component: <Reception /> },
        {
          path: 'educational-department',
          component: <EducationalDepartment />,
        },
      ],
    },
    {
      path: 'about/*',
      items: aboutItems,
      subRoutes: [
        { component: <History />, index: true },
        { path: 'departments', component: <Departments /> },
        { path: 'accreditation', component: <AccreditationPage /> },
        { path: 'brsm', component: <Brsm /> },
        { path: 'consultation', component: <Consultation /> },
        { path: 'regulations', component: <Regulations /> },
        { path: 'library', component: <LibraryPage /> },
        { path: 'contacts', component: <OneWindowPage /> },
        { path: 'statements', component: <Statements /> },
        { path: 'reception', component: <Reception /> },
        {
          path: 'educational-department',
          component: <EducationalDepartment />,
        },
      ],
    },
    {
      path: 'applicant/*',
      items: applicantItems,
      subRoutes: [
        { component: <Dates />, index: true },
        { path: 'rules', component: <Rules /> },
        { path: 'documents', component: <Documents /> },
        { path: 'admission', component: <Admissions /> },
      ],
    },
    {
      path: 'student/*',
      items: studentItems,
      subRoutes: [
        { component: <Timetables />, index: true },
        { path: 'rules', component: <StudentRules /> },
        { path: 'schedule', component: <Schedule /> },
        { path: 'price', component: <Price /> },
      ],
    },
    {
      path: 'achievements/*',
      items: achievementsItems,
      subRoutes: [{ component: <Achievements />, index: true }],
    },
  ]

  const authRoutes = [
    {
      component: <Statistics />,
      index: true,
    },
    {
      path: 'teachers',
      component: <TeachersPage />,
    },
    {
      path: 'departments',
      component: <DepartmentsPage />,
    },
    {
      path: 'lessons',
      component: <LessonsPage />,
    },
    {
      path: 'post-categories',
      component: <PostCategoriesPage />,
    },
    {
      path: 'posts',
      component: <PostsPage />,
    },
    {
      path: 'image-categories',
      component: <ImageCategoriesPage />,
    },
    {
      path: 'images',
      component: <ImagesPage />,
    },
    {
      path: 'timetables',
      component: <TimetablesPage />,
    },
    {
      path: 'achievements',
      component: <AchievementsPage />,
    },
    {
      path: 'statements',
      component: <StatementsPage />,
    },
    {
      path: 'dates',
      component: <DatesPage />,
    },
    {
      path: 'admissions',
      component: <AdmissionsPage />,
    },
    {
      path: 'schedules',
      component: <SchedulesPage />,
    },
    {
      path: 'prices',
      component: <PricesPage />,
    },
  ]

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayoutPage />}>
          <Route index element={<LandingPage />} />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<MainSider items={route.items} />}
            >
              {route.subRoutes.map((subRoute, subIndex) => (
                <Route
                  key={subIndex}
                  index={subRoute?.index}
                  path={subRoute.path ? subRoute.path : ''}
                  element={subRoute.component}
                />
              ))}
            </Route>
          ))}
        </Route>
        {isLoggedIn ? (
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        ) : (
          <Route
            path='/auth/login'
            element={<LoginPage onLogin={handleAuthorization} />}
          />
        )}
        {isLoggedIn ? (
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        ) : (
          <Route
            path='/auth/registration'
            element={<RegistrationPage onRegistration={handleAuthorization} />}
          />
        )}
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
            {authRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.component}
                index={route?.index}
              />
            ))}
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

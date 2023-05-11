import { Route, Routes } from 'react-router-dom'
import { Teachers } from './pages/Teachers/components/Teachers'
import { Lessons } from './pages/Lessons/components/Lessons'
import { Departments } from './pages/Departments/components/Departments'
import { LoginForm } from './modules/LoginForm/components/LoginForm/LoginForm'
import { Posts } from './pages/Posts/components/Posts'
import { RegistrationForm } from './modules/RegistrationForm/components/RegistrationForm/RegistrationForm'
import { Images } from './pages/Images/components/Images'
import { Categories } from './pages/Categories/components/Categories'
import { DashboardLayoutPage } from './pages/DashboardLayout/components/DashboardLayoutPage'
import { MainLayoutPage } from './pages/MainLayout/components/MainLayoutPage'
import { MainPosts } from './pages/MainPosts/components/MainPosts'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayoutPage />}>
          <Route index element={<MainPosts />} />
        </Route>
        <Route path='/auth/login' element={<LoginForm />} />
        <Route path='/auth/registration' element={<RegistrationForm />} />
        <Route path='/dashboard' element={<DashboardLayoutPage />}>
          <Route index element={<LoginForm />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='departments' element={<Departments />} />
          <Route path='lessons' element={<Lessons />} />
          <Route path='posts' element={<Posts />} />
          <Route path='categories' element={<Categories />} />
          <Route path='images' element={<Images />} />
        </Route>
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App

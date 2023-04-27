import { Route, Routes } from 'react-router-dom'
import MainLayoutPage from './pages/MainLayoutPage/components/MainLayoutPage'
import { Teachers } from './pages/Teachers/components/Teachers'
import { Lessons } from './pages/Lessons/components/Lessons'
import { Departments } from './pages/Departments/components/Departments'
import { LoginForm } from './modules/LoginForm/components/LoginForm/LoginForm'
import { Posts } from './pages/Posts/components/Posts'
import { RegistrationForm } from './modules/RegistrationForm/components/RegistrationForm/RegistrationForm'

function App() {
  return (
    <>
      <Routes>
        <Route path='/auth/login' element={<LoginForm />} />
        <Route path='/auth/registration' element={<RegistrationForm />} />
        <Route path='/dashboard' element={<MainLayoutPage />}>
          <Route index element={<LoginForm />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='departments' element={<Departments />} />
          <Route path='lessons' element={<Lessons />} />
          <Route path='posts' element={<Posts />} />
          <Route path='gallery' element={<LoginForm />} />
        </Route>
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App

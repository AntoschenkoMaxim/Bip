import { Route, Routes } from 'react-router-dom'
import MainLayoutPage from './pages/MainLayoutPage/components/MainLayoutPage'
import { Teachers } from './pages/Teachers/components/Teachers'
import { Lessons } from './pages/Lessons/components/Lessons'
import { Departments } from './pages/Departments/components/Departments'
import { LoginForm } from './modules/LoginForm/components/LoginForm/LoginForm'

function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<MainLayoutPage />}>
          <Route index element={<LoginForm />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='departments' element={<Departments />} />
          <Route path='lessons' element={<Lessons />} />
        </Route>
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App

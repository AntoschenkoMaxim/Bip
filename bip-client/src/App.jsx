import { Route, Routes } from 'react-router-dom'
import MainLayoutPage from './pages/MainLayoutPage/components/MainLayoutPage'
import { Teachers } from './pages/Teachers/components/Teachers'
import { Lessons } from './pages/Lessons/components/Lessons'

function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<MainLayoutPage />}>
          <Route index element={<Teachers />} />
          <Route path='lessons' element={<Lessons />} />
        </Route>
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App

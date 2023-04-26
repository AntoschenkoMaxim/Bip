import { Route, Routes } from 'react-router-dom'
import MainLayoutPage from './pages/MainLayoutPage/components/MainLayoutPage'
import { Teachers } from './pages/Teachers/components/Teachers'

function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<MainLayoutPage />}>
          <Route index element={<Teachers />} />
        </Route>
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App

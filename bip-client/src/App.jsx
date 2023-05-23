import { Route, Routes } from 'react-router-dom'
import { Teachers } from './pages/Teachers/components/Teachers'
import { Lessons } from './pages/Lessons/components/Lessons'
import { Departments } from './pages/Departments/components/Departments'
import { LoginForm } from './modules/LoginForm/components/LoginForm/LoginForm'
import { Posts } from './pages/Posts/components/Posts'
import { RegistrationForm } from './modules/RegistrationForm/components/RegistrationForm/RegistrationForm'
import { Images } from './pages/Images/components/Images'
import { DashboardLayoutPage } from './pages/DashboardLayout/components/DashboardLayoutPage'
import { MainLayoutPage } from './pages/MainLayout/components/MainLayoutPage'
import { MainPosts } from './pages/MainPosts/components/MainPosts'
import { AccreditationPage } from './pages/Accreditation/components/AccreditationPage'
import { OneWindowPage } from './pages/OneWindow/components/OneWindowPage'
import { LibraryPage } from './pages/Library/components/LibraryPage'
import { ImageCategoriesPage } from './pages/ImageCategories/components/ImageCategoriesPage'
import { PostCategoriesPage } from './pages/PostCategories/components/PostCategoriesPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayoutPage />}>
          <Route index element={<MainPosts />} />
          <Route path='library' element={<LibraryPage />} />
          <Route path='accreditation' element={<AccreditationPage />} />
          <Route path='one-window' element={<OneWindowPage />} />
        </Route>
        <Route path='/auth/login' element={<LoginForm />} />
        <Route path='/auth/registration' element={<RegistrationForm />} />
        <Route path='/dashboard' element={<DashboardLayoutPage />}>
          <Route index element={<LoginForm />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='departments' element={<Departments />} />
          <Route path='lessons' element={<Lessons />} />
          <Route path='posts-categories' element={<PostCategoriesPage />} />
          <Route path='posts' element={<Posts />} />
          <Route path='categories' element={<ImageCategoriesPage />} />
          <Route path='images' element={<Images />} />
        </Route>
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App

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

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayoutPage />}>
          <Route index element={<MainPostsPage />} />
          <Route path='library' element={<LibraryPage />} />
          <Route path='accreditation' element={<AccreditationPage />} />
          <Route path='one-window' element={<OneWindowPage />} />
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
        </Route>
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App

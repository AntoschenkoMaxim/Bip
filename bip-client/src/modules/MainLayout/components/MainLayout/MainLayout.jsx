import { Breadcrumb, Layout, Menu, Select } from 'antd'
import { getItem } from '../../helpers/getItem'
import { Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const { Header, Content, Footer } = Layout

export function MainLayout() {
  const navigate = useNavigate()

  const options = [
    {
      value: 'ru',
      label: 'Русский',
    },
    {
      value: 'by',
      label: 'Белорусский',
    },
    {
      value: 'en',
      label: 'English',
    },
  ]

  const { i18n } = useTranslation()

  const items = i18n
    .t('main_menu', { returnObjects: true })
    .map((item) => getItem(item.title, item.path))

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['']}
          items={items}
          onClick={({ keyPath }) => navigate(`/${keyPath}`)}
        />
        <Select options={options} defaultValue='ru' onChange={changeLanguage} />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Главная</Breadcrumb.Item>
          <Breadcrumb.Item>Новости</Breadcrumb.Item>
        </Breadcrumb>
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Bip University ©2023 All rights reserved.
      </Footer>
    </Layout>
  )
}

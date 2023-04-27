import {
  HomeOutlined,
  TeamOutlined,
  PictureOutlined,
  InboxOutlined,
  FileProtectOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getItem } from '../helpers/getItem'

const { Header, Content, Footer, Sider } = Layout

const items = [
  getItem('Главная', '/', <HomeOutlined />),
  getItem('Кафедры', 'departments', <InboxOutlined />),
  getItem('Преподаватели', 'teachers', <TeamOutlined />),
  getItem('Предметы', 'lessons', <ProfileOutlined />),
  getItem('Новости', 'posts', <FileProtectOutlined />),
  getItem('Галерея', 'gallery', <PictureOutlined />),
]

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          theme='dark'
          defaultSelectedKeys={['departments']}
          mode='inline'
          items={items}
          onClick={({ keyPath }) => navigate(`/dashboard/${keyPath}`)}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Модератор</Breadcrumb.Item>
            <Breadcrumb.Item>Преподаватели</Breadcrumb.Item>
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
    </Layout>
  )
}

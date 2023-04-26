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
import { Outlet } from 'react-router-dom'
import { getItem } from '../helpers/getItem'

const { Header, Content, Footer, Sider } = Layout

const items = [
  getItem('Главная', '1', <HomeOutlined />),
  getItem('Кафедры', '2', <InboxOutlined />),
  getItem('Преподаватели', '3', <TeamOutlined />),
  getItem('Предметы', '4', <ProfileOutlined />),
  getItem('Новости', '5', <FileProtectOutlined />),
  getItem('Галерея', '6', <PictureOutlined />),
]

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
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
          defaultSelectedKeys={['1']}
          mode='inline'
          items={items}
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

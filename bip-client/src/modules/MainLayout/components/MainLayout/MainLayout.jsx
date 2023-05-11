import { Breadcrumb, Layout, Menu, theme } from 'antd'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { getItem } from '../../helpers/getItem'
import { Outlet, useNavigate } from 'react-router-dom'
import React from 'react'
const { Header, Content, Footer, Sider } = Layout

const items = [
  getItem('Главная', '/'),
  getItem('О филиале', 'about'),
  getItem('Абитуриенту', 'enrollee'),
  getItem('Студенту', 'students'),
  getItem('Достижения', 'achievements'),
]

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1)
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1
        return {
          key: subKey,
          label: `option${subKey}`,
        }
      }),
    }
  }
)

export function MainLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navigate = useNavigate()

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
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['/']}
          items={items}
          onClick={({ keyPath }) => navigate(`/${keyPath}`)}
        />
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
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
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

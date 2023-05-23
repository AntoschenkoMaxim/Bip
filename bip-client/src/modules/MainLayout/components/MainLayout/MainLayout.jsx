import { Breadcrumb, Layout, Menu, theme } from 'antd'
import {
  BookOutlined,
  CrownOutlined,
  ContainerOutlined,
  QuestionCircleOutlined,
  PhoneOutlined,
  UsergroupAddOutlined,
  AuditOutlined,
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

const items2 = [
  getItem('Новости', '', <ContainerOutlined />),
  getItem('ОВРСМ', 'ovrsm', <UsergroupAddOutlined />, [
    getItem('Клубы, кружки, проекты', 'projects'),
    getItem('БРСМ', 'brsm'),
    getItem('Консультации психолога', 'consultation'),
  ]),
  getItem('ЦПО', 'cpo', <AuditOutlined />, [
    getItem(
      'Положения регламентирующие деятельность первичной профсоюзной организации',
      'regulations'
    ),
  ]),
  getItem('Библиотека', 'library', <BookOutlined />),
  getItem('Наши достижения', 'achievements', <CrownOutlined />),
  getItem(
    'Аккредитация и лицензирование',
    'accreditation',
    <QuestionCircleOutlined />
  ),
  getItem('Одно окно', 'one-window', <PhoneOutlined />),
]

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
              height: '100%',
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode='inline'
              defaultSelectedKeys={['']}
              style={{
                height: '100%',
              }}
              items={items2}
              onClick={({ keyPath }) => navigate(`/${keyPath}`)}
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

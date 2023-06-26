import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Layout,
  Menu,
  Popover,
  Typography,
  theme,
} from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumbs } from '../../../../components'
import * as images from '../../../../assets/index'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

const { Header, Content, Footer, Sider } = Layout

export function DashboardLayout({ items, onLogout }) {
  const [collapsed, setCollapsed] = useState(false)
  const [accessToken, setAccessToken] = useState()
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const { t } = useTranslation()

  const routes = [t('breadcrumbs.dashboard', { returnObjects: true })]

  const location = useLocation()
  const selectedKey = location.pathname.slice('/dashboard/'.length)

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      setAccessToken(accessToken)
    }
  }, [])

  console.log(accessToken)

  const content = (
    <div>
      <p>Имя: {'asdasd'}</p>
      <p>Email: {'asdasdasd'}</p>
      <Button type='primary' onClick={onLogout}>
        Выйти
      </Button>
    </div>
  )

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 4,
          }}
        >
          <img src={images.logo} style={{ width: 48 }} />
        </div>

        <Menu
          theme='dark'
          defaultSelectedKeys={['']}
          mode='inline'
          items={items}
          selectedKeys={[selectedKey]}
          onSelect={({ selectedKeys }) =>
            navigate(`/dashboard/${selectedKeys}`)
          }
        />
      </Sider>
      <Layout className='site-layout'>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Popover placement='bottomRight' content={content} trigger='click'>
            <Avatar src={'/'} />
          </Popover>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumbs routes={routes} />
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

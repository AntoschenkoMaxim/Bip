import { Layout, Menu, Typography, theme } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumbs } from '../../../../components'
import * as images from '../../../../assets/index'

const { Header, Content, Footer, Sider } = Layout

export function DashboardLayout({ items }) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const { t } = useTranslation()

  const routes = [t('breadcrumbs.dashboard', { returnObjects: true })]

  const location = useLocation()
  const selectedKey = location.pathname.slice('/dashboard/'.length)

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
        />
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

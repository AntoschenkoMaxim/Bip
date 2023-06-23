import { Layout, Menu, theme } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
const { Content, Sider } = Layout

export function MainSider({ items, icons }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navigate = useNavigate()

  return (
    <Layout
      style={{
        marginTop: '24px',
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
          defaultSelectedKeys={[
            '',
            'about',
            'applicant',
            'student',
            'achievements',
          ]}
          style={{
            height: '100%',
          }}
          items={items}
          onSelect={({ selectedKeys }) => navigate(`/${selectedKeys}`)}
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
  )
}

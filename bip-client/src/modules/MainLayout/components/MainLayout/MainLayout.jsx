import {
  Col,
  Divider,
  Layout,
  Menu,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  InstagramOutlined,
  ChromeOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
import * as images from '../../../../assets/index'
import { getItem } from '../../../../helpers/getItem'
const { Header, Content, Footer } = Layout
const { Title } = Typography

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

  const location = useLocation()
  const selectedKey = location.pathname.replace('/', '')

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Header
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src={images.logo} style={{ width: 48 }} />
        <Menu
          style={{ width: '33%' }}
          mode='horizontal'
          theme='dark'
          selectedKeys={[selectedKey]}
          items={items}
          onSelect={({ selectedKeys }) => navigate(`/${selectedKeys}`)}
        />
        <Select options={options} defaultValue='ru' onChange={changeLanguage} />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        {/* {breadcrumbs} */}
        <Outlet />
      </Content>

      <Footer>
        <Divider />
        <Row justify='center' align='middle'>
          <Col style={{ textAlign: 'center' }}>
            <Title level={5}>Bip University ©2023 All rights reserved.</Title>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}

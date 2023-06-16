import {
  Breadcrumb,
  Col,
  Divider,
  Layout,
  Menu,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import { getItem } from '../../helpers/getItem'
import { Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  InstagramOutlined,
  ChromeOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
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

      <Footer>
        <Divider />
        <Row justify='space-between' align='middle'>
          <Col>
            <Typography.Link>
              <Title level={3}>Bip.</Title>
            </Typography.Link>
          </Col>
          <Col>
            <Space split={<Divider type='vertical' />}>
              <Typography.Link href='http://bip-grodno.by/' target='_blank'>
                <ChromeOutlined style={{ fontSize: 18 }} />
              </Typography.Link>
              <Typography.Link
                href='https://instagram.com/bip_grodno_?igshid=MzRlODBiNWFlZA=='
                target='_blank'
              >
                <InstagramOutlined style={{ fontSize: 18 }} />
              </Typography.Link>
              <Typography.Link href='https://vk.com/bipgrodno' target='_blank'>
                <GlobalOutlined style={{ fontSize: 18 }} />
              </Typography.Link>
            </Space>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}

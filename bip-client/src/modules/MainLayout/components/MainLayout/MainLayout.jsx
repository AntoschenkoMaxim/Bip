import { Breadcrumb, Col, Layout, Menu, Row, Select, Typography } from 'antd'
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
      <Footer>
        <Row>
          <Col span={24}>
            <Typography.Link href='http://edu.gov.by/feedback/grafik-lichnogo-priema-grazhdan-i-yuridicheskikh-lits-rukovodstvom/'>
              График личного приема граждан и юридических лиц руководством
              Министерства образования РБ
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Link href='http://edu.gov.by/feedback/lichnyy-priem/grafik-priema-grazhdan-i-yuridicheskikh-lits-nachalnikami-strukturnykh-podrazdeleniy/index.php'>
              Прием граждан начальниками структурных подразделений Министерства
              образования Республики Беларусь
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Link href='https://edu-grodno.by/rezhim-raboty/'>
              Прием граждан руководителями Главного управления образования
              облисполкома
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Link href='https://aor.gov.by/ru/appeal-473-ru#:~:text=Запись%20на%20прием%20к%20главе,(0152)%2049%2006%2092'>
              Прием граждан в администрации Октябрьского района
            </Typography.Link>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}

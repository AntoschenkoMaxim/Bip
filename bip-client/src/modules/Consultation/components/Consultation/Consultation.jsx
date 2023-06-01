import { CaretRightOutlined } from '@ant-design/icons'
import { Col, Collapse, List, Row, Table, Tag, Typography, theme } from 'antd'
import { useTranslation } from 'react-i18next'
const { Panel } = Collapse

export function Consultation() {
  const { token } = theme.useToken()

  const { t, i18n } = useTranslation()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const columns = t('main.consultation.table.columns', {
    returnObjects: true,
  }).map((item) => ({
    title: item.title,
    dataIndex: item.dataIndex,
    key: item.key,
  }))

  const tableDataSource = t('main.consultation.table.items', {
    returnObjects: true,
  }).map((item) => ({
    key: item.fullname,
    fullname: item.fullname,
    role: item.role,
    phone: <Typography.Text copyable>{item.phone}</Typography.Text>,
  }))

  const collapseDataSource = t('main.consultation.collapse.items', {
    returnObjects: true,
  })

  const footer = () => {
    return t('main.consultation.table.footer', {
      returnObjects: true,
    }).map((item) => (
      <Row key={item}>
        <Col>
          <Typography.Text>{item}</Typography.Text>
        </Col>
      </Row>
    ))
  }

  const mockdata = [
    {
      key: '1',
      title: t('main.consultation.table.title'),
      children: (
        <Table
          tableLayout='fixed'
          bordered
          footer={() => footer()}
          columns={columns}
          dataSource={tableDataSource}
          pagination={false}
        />
      ),
    },
    {
      key: '2',
      title: t('main.consultation.collapse.title'),
      children: (
        <List
          dataSource={collapseDataSource}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
  ]
  return (
    <Collapse
      bordered={false}
      activeKey={['1', '2']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
    >
      {mockdata.map((item) => (
        <Panel header={item.title} key={item.key} style={panelStyle}>
          {item.children}
        </Panel>
      ))}
    </Collapse>
  )
}

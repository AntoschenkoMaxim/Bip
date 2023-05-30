import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, List, Table, Tag, theme } from 'antd'
import { useTranslation } from 'react-i18next'
const { Panel } = Collapse

export function EducationalDepartment() {
  const { token } = theme.useToken()

  const { t, i18n } = useTranslation()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const columns = t('main.educational.table.columns', {
    returnObjects: true,
  }).map((item) => ({
    title: item.title,
    dataIndex: item.dataIndex,
    key: item.key,
  }))

  const tableDataSource = t('main.educational.table.items', {
    returnObjects: true,
  }).map((item) => ({
    key: item.fullname,
    fullname: item.fullname,
    role: item.role,
    phone: item.phone,
  }))

  const collapseDataSource = t('main.educational.collapse.items', {
    returnObjects: true,
  })

  const mockdata = [
    {
      key: '1',
      title: t('main.educational.table.title'),
      children: (
        <Table
          tableLayout='fixed'
          bordered
          columns={columns}
          dataSource={tableDataSource}
          pagination={false}
        />
      ),
    },
    {
      key: '2',
      title: t('main.educational.collapse.title'),
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

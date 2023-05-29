import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, List, Table, Tag, theme } from 'antd'
import { useTranslation } from 'react-i18next'
const { Panel } = Collapse

export function Library() {
  const { token } = theme.useToken()

  const { t, i18n } = useTranslation()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const dataSource = i18n
    .t('library.work_time', { returnObjects: true })
    .map((item, index, arr) => ({
      key: item.days,
      days: item.days,
      time: (
        <Tag color={item === arr[arr.length - 1] ? 'error' : 'geekblue'}>
          {item.time}
        </Tag>
      ),
    }))

  const columns = [
    {
      title: i18n.t('library.work_days_column'),
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: i18n.t('library.work_time_column'),
      dataIndex: 'time',
      key: 'time',
    },
  ]

  const mockdata = [
    {
      key: '1',
      title: t('library.work_time_title'),
      children: (
        <Table
          tableLayout='fixed'
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      ),
    },
    {
      key: '2',
      title: t('library.rules_title'),
      children: (
        <Collapse
          ghost
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          {i18n.t('library.rules', { returnObjects: true }).map((item) => (
            <Panel header={item.title} key={item.title} style={panelStyle}>
              <List
                dataSource={item.items}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Panel>
          ))}
        </Collapse>
      ),
    },
  ]
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1', '2']}
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

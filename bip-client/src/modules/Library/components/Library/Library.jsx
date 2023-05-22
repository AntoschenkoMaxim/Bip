import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, List, Table, Tag, theme } from 'antd'
import { rules } from '../../constants/rules'
import { columns } from '../../constants/columns'
import { dataSource } from '../../constants/dataSource'
const { Panel } = Collapse
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export function Library() {
  const { token } = theme.useToken()
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const mockdata = [
    {
      key: '1',
      title: 'График работы',
      children: (
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      ),
    },
    {
      key: '2',
      title: 'Правила поведения в библиотеке',
      children: (
        <Collapse
          ghost
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          {rules.map((item) => (
            <Panel header={item.title} key={item.key} style={panelStyle}>
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

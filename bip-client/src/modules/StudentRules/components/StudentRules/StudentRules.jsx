import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, List, theme } from 'antd'
import { useTranslation } from 'react-i18next'
const { Panel } = Collapse

export function StudentRules() {
  const { token } = theme.useToken()

  const { t } = useTranslation()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

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
      <Panel header={t('student.rules.title')} key='1' style={panelStyle}>
        <Collapse
          ghost
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          {t('student.rules.items', { returnObjects: true }).map((item) => (
            <Panel header={item.title} key={item.title} style={panelStyle}>
              <List
                dataSource={item.description}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Panel>
          ))}
        </Collapse>
      </Panel>
    </Collapse>
  )
}

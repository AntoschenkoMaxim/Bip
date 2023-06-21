import { Collapse, List, Typography, theme } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
const { Panel } = Collapse

export function Reception() {
  const { token } = theme.useToken()
  const { i18n } = useTranslation()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const dataSource = i18n.t('main.reception.items', { returnObjects: true })

  return (
    <Collapse
      bordered={false}
      activeKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
    >
      <Panel header={i18n.t('main.reception.title')} key='1' style={panelStyle}>
        <List
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item>
              <Typography.Link href={item.link} target='_blank'>
                {item.title}
              </Typography.Link>
            </List.Item>
          )}
        />
      </Panel>
    </Collapse>
  )
}

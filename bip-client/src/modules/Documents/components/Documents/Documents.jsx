import { Collapse, List, theme } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
const { Panel } = Collapse

export function Documents() {
  const { token } = theme.useToken()
  const { i18n } = useTranslation()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const dataSource = i18n.t('applicant.documents.items', {
    returnObjects: true,
  })

  return (
    <Collapse
      bordered={false}
      activeKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{ background: token.colorBgContainer }}
    >
      <Panel
        header={i18n.t('applicant.documents.title')}
        key='1'
        style={panelStyle}
      >
        <List
          dataSource={dataSource}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Panel>
    </Collapse>
  )
}

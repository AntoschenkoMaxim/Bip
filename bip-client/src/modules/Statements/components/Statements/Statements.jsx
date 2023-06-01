import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, Image, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import * as image from '../../../../assets/index'
const { Panel } = Collapse

export function Statements() {
  const { token } = theme.useToken()

  const { t, i18n } = useTranslation()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const images = [
    image.trade_union,
    image.anniversary,
    image.financial,
    image.new_trade_union,
    image.contributions,
  ]

  const dataSource = t('main.statements.titles', {
    returnObjects: true,
  }).map((item, index) => ({
    title: item,
    image: images[index],
  }))

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
    >
      {dataSource.map((item) => (
        <Panel header={item.title} key={item.title} style={panelStyle}>
          <Image width={400} src={item.image} alt={item.image} />
        </Panel>
      ))}
    </Collapse>
  )
}

import { CaretRightOutlined } from '@ant-design/icons'
import { Col, Collapse, Image, Row, theme } from 'antd'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { PRICES_URL } from '../../../../constants/urls'
import { PRICES_KEY } from '../../../../constants/keys'
const { Panel } = Collapse

export function Price() {
  const { token } = theme.useToken()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const { data: prices, isSuccess } = useGetAllItemsQuery(
    PRICES_URL,
    PRICES_KEY
  )

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
      {isSuccess &&
        prices?.rows.map((item) => (
          <Panel header={item.title} key={item.image} style={panelStyle}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                <Image
                  src={`${import.meta.env.VITE_BASE_URL}/${item.price_image}`}
                />
              </Col>
              <Col>
                <Image
                  src={`${import.meta.env.VITE_BASE_URL}/${item.payment_image}`}
                />
              </Col>
            </Row>
          </Panel>
        ))}
    </Collapse>
  )
}

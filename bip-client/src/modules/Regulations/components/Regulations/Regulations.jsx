import { Col, Image, Row } from 'antd'
import { mockdata } from '../../constants/mockdata'

export function Regulations() {
  return (
    <Row gutter={[8, 8]}>
      {mockdata.map((item) => (
        <Col key={item} sm={24} md={12} lg={8}>
          <Image src={item} />
        </Col>
      ))}
    </Row>
  )
}

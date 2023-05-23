import { Col, Image, Row } from 'antd'
import { mockdata } from '../../constants/mockdata'

export function Accreditation() {
  return (
    <Row gutter={[8, 8]}>
      {mockdata.map((item) => (
        <Col key={item.key} sm={24} md={12} lg={8}>
          <Image src={item.image} />
        </Col>
      ))}
    </Row>
  )
}

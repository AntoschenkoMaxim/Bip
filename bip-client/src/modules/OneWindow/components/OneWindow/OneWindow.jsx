import { Col, Row, Table, Tag, Typography } from 'antd'
import { dataSource } from '../../constants/dataSource'
import { columns } from '../../constants/columns'
import { mockdata } from '../../constants/mockdata'

export function OneWindow() {
  return (
    <Table
      bordered
      footer={() =>
        mockdata.map((item) => (
          <Row key={item.key}>
            <Col>
              <Typography.Link href={`${item.link}${item.content}`}>
                {item.content}
              </Typography.Link>{' '}
              - {item.title}
            </Col>
          </Row>
        ))
      }
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

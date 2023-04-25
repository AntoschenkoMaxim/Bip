import { Button, Col, Row } from 'antd'
import { steps } from '../../constants/steps'

export function RegistrationButtons({ current, next, prev }) {
  return (
    <>
      {current < steps.length - 1 && (
        <Button block type='primary' onClick={() => next()}>
          Next
        </Button>
      )}
      <Row gutter={16}>
        <Col span={12}>
          {current > 0 && (
            <Button block type='dashed' onClick={() => prev()}>
              Previous
            </Button>
          )}
        </Col>
        <Col span={12}>
          {current === steps.length - 1 && (
            <Button block type='primary' htmlType='submit'>
              Done
            </Button>
          )}
        </Col>
      </Row>
    </>
  )
}

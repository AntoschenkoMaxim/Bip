import { Button, Col, Row } from 'antd'
import { steps } from '../../constants/steps'

export function RegistrationButtons({ current, next, prev }) {
  return (
    <>
      {current < steps.length - 1 && (
        <Button block type='primary' onClick={() => next()}>
          Следующий
        </Button>
      )}
      <Row gutter={16} style={{ marginBottom: 8 }}>
        <Col span={12}>
          {current > 0 && (
            <Button block type='dashed' onClick={() => prev()}>
              Предыдущий
            </Button>
          )}
        </Col>
        <Col span={12}>
          {current === steps.length - 1 && (
            <Button block type='primary' htmlType='submit'>
              Начать
            </Button>
          )}
        </Col>
      </Row>
    </>
  )
}

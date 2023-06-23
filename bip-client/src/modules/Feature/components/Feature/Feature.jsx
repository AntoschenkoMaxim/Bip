import { Card, Typography, Row, Col } from 'antd'
import {
  FieldTimeOutlined,
  EnvironmentOutlined,
  StarOutlined,
  SolutionOutlined,
  TeamOutlined,
  ScheduleOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styles from './Feature.module.css'

const { Title, Text } = Typography

export function Feature() {
  const { t } = useTranslation()

  const icons = [
    <EnvironmentOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />,
    <FieldTimeOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />,
    <ScheduleOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />,
    <StarOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />,
    <SolutionOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />,
    <TeamOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />,
  ]

  const items = t('landing.features.items', { returnObjects: true }).map(
    (item, index) => ({
      title: item.title,
      description: item.description,
      icon: icons[index],
    })
  )

  return (
    <div className={styles.featureSection}>
      <Title level={2}>{t('landing.features.title')}</Title>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col xs={24} sm={12} md={8}>
            <Card>
              {item.icon}
              <Title level={4}>{item.title}</Title>
              <Text>{item.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

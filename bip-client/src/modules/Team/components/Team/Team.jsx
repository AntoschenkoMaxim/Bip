import { Card, Typography, Row, Col, Avatar, Tag } from 'antd'
import styles from './Team.module.css'
import * as images from '../../../../assets/index'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography

export function Team() {
  const { t } = useTranslation()

  const imagesArr = [images.team1, images.team2, images.team3]

  const items = t('landing.team.items', { returnObjects: true }).map(
    (item, index) => ({
      name: item.name,
      role: item.role,
      phone: item.phone,
      image: imagesArr[index],
    })
  )

  return (
    <div className={styles.teamSection}>
      <Title level={2}>{t('landing.team.title')}</Title>
      <Row gutter={16}>
        {items.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.name}>
            <div className={styles.teamCard}>
              <Card>
                <Avatar size={64} src={item.image} />
                <div className={styles.teamCardContent}>
                  <Title level={4}>{item.name}</Title>
                  <Text>
                    <Tag color='geekblue' className={styles.adaptiveTag}>
                      {item.role}
                    </Tag>
                  </Text>
                  <Text>{item.phone}</Text>
                </div>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

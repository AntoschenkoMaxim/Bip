import { Carousel, Avatar, Typography, Card } from 'antd'
import styles from './Testimonials.module.css'
import * as images from '../../../../assets/index'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography

export function Testimonials() {
  const { t } = useTranslation()

  const imagesArr = [
    images.testimonial1,
    images.testimonial2,
    images.testimonial3,
  ]

  const items = t('landing.testimonials.items', { returnObjects: true }).map(
    (item, index) => ({
      name: item.name,
      comment: item.comment,
      image: imagesArr[index],
    })
  )

  return (
    <div className={styles.testimonialsSection}>
      <Title level={2}>{t('landing.testimonials.title')}</Title>
      <Carousel autoplay>
        {items.map((testimonial, index) => (
          <Card key={index} className={styles.testimonialCard}>
            <Avatar src={testimonial.image} size={64} />
            <Title level={4}>{testimonial.name}</Title>
            <Text>{testimonial.comment}</Text>
          </Card>
        ))}
      </Carousel>
    </div>
  )
}

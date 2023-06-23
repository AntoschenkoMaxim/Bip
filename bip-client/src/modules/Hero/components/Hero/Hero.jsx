import { Typography, Button, Image, Carousel } from 'antd'
import styles from './Hero.module.css'
import * as images from '../../../../assets/index'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

export function Hero() {
  // const imagesArr = [images.hero2, images.hero3, images.hero4, images.hero5];
  const { t } = useTranslation()

  const navigate = useNavigate()

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div>
          <Title level={1} className={styles.heroTitle}>
            {t('landing.title')}
          </Title>
          <Text className={styles.heroDescription}>
            {t('landing.description')}
          </Text>
        </div>
        <div className={styles.heroButtonContainer}>
          <Button
            type='primary'
            size='large'
            className={styles.heroButton}
            onClick={() => navigate('/posts')}
          >
            {t('landing.button')}
          </Button>
        </div>
      </div>
      <div className={styles.heroImage}>
        {/* {imagesArr.map((item) => (
          <div key={item}>
            <Image src={item} alt='Hero Image' />
          </div>
        ))} */}
        <Image src={images.hero1} alt='Hero Image' />
      </div>
    </div>
  )
}

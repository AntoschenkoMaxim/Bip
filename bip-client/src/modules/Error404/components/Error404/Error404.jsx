import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Error404() {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <Result
      status='404'
      title='404'
      subTitle={t('error404.subtitle')}
      extra={
        <Button type='primary' onClick={handleGoBack}>
          {t('error404.button')}
        </Button>
      }
    />
  )
}

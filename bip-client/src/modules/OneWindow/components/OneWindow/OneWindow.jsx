import { Col, Row, Table, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export function OneWindow() {
  const { i18n } = useTranslation()

  const hrefHandler = (item, arr) => {
    return arr[0] === item ? `${item.link}` : `${item.link}${item.content}`
  }

  const footer = () => {
    return i18n
      .t('one-window.contacts.footer', { returnObjects: true })
      .map((item, index, arr) => (
        <Row key={item.title}>
          <Col>
            <Typography.Link
              href={hrefHandler(item, arr)}
              target={arr[0] === item ? '_blank' : null}
            >
              {item.content}
            </Typography.Link>{' '}
            - {item.title}
          </Col>
        </Row>
      ))
  }

  const columns = i18n
    .t('one-window.contacts.columns', { returnObjects: true })
    .map((item) => ({
      title: item.title,
      dataIndex: item.dataIndex,
      key: item.key,
    }))

  const dataSource = i18n
    .t('one-window.contacts.items', { returnObjects: true })
    .map((item) => ({
      key: item.fullname,
      fullname: item.fullname,
      role: item.role,
      phone: <Typography.Text copyable>{item.phone}</Typography.Text>,
    }))

  return (
    <Table
      tableLayout='fixed'
      bordered
      footer={() => footer()}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

import { Table, Tag } from 'antd'
import { useTranslation } from 'react-i18next'

export function Dates() {
  const { i18n } = useTranslation()

  const colorHandler = (item, arr) => {
    return arr[arr.length - 1] === item
      ? 'error'
      : arr[arr.length - 2] === item
      ? 'purple'
      : 'geekblue'
  }

  const dataSource = i18n
    .t('applicant.dates.items', { returnObjects: true })
    .map((item, index, arr) => ({
      key: item.info,
      info: item.info,
      date: <Tag color={colorHandler(item, arr)}>{item.date}</Tag>,
    }))

  const columns = i18n
    .t('applicant.dates.columns', { returnObjects: true })
    .map((item) => ({
      title: item.title,
      dataIndex: item.dataIndex,
      key: item.key,
    }))

  return (
    <Table
      tableLayout='fixed'
      bordered
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

export function Brsm() {
  const { i18n } = useTranslation()
  const columns = i18n
    .t('main.brsm.columns', { returnObjects: true })
    .map((item) => ({
      title: item.title,
      dataIndex: item.dataIndex,
      key: item.key,
    }))

  const dataSource = i18n.t('main.brsm.items', { returnObjects: true })

  return (
    <Table
      bordered
      tableLayout='fixed'
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

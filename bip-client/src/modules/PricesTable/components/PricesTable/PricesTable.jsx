import { Badge, Image, Table } from 'antd'
import { useState } from 'react'
import { UpdatePriceForm } from '../UpdatePriceForm/UpdatePriceForm'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useRemovePriceByIdQuery } from '../../hooks/useRemovePriceByIdQuery'
import { useGetAllPricesQuery } from '../../../../hooks/useGetAllPricesQuery'

export function PricesTable() {
  const { getColumnSearchProps } = useTableFilterAndSearch()
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title', 'заголовку'),
    },
    {
      title: 'Стоимость',
      dataIndex: 'price_image',
      key: 'price_image',
      render: (image) => (
        <Image
          src={`${import.meta.env.VITE_BASE_URL}/${image}`}
          alt='price_image'
          width={100}
        />
      ),
    },
    {
      title: 'Оплата',
      dataIndex: 'payment_image',
      key: 'payment_image',
      render: (image) => (
        <Image
          src={`${import.meta.env.VITE_BASE_URL}/${image}`}
          alt='payment_image'
          width={100}
        />
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        prices?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removePrice}
            showModal={showModal}
          />
        ) : null,
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState(null)

  const showModal = (id) => {
    setId(id)
    setIsModalOpen(true)
  }

  const { data: prices, isSuccess } = useGetAllPricesQuery()

  const { mutate: removePrice } = useRemovePriceByIdQuery()

  return (
    <>
      <UpdatePriceForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isSuccess && (
        <Badge count={prices?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={prices?.rows}
            pagination={{
              defaultPageSize: '5',
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15],
            }}
          />
        </Badge>
      )}
    </>
  )
}

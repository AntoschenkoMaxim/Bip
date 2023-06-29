import { Badge, Button, Divider, Image, Table } from 'antd'
import { useState } from 'react'
import { PriceForm } from '../PriceForm/PriceForm'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useRemovePriceByIdQuery } from '../../hooks/useRemovePriceByIdQuery'
import { useGetAllPricesQuery } from '../../../../hooks/useGetAllPricesQuery'
import { useUpdatePriceByIdQuery } from '../../hooks/useUpdatePriceByIdQuery'
import { useCreatePriceQuery } from '../../hooks/useCreatePriceQuery'

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
            showModal={showUpdateModal}
          />
        ) : null,
    },
  ]

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState()

  const showUpdateModal = (record) => {
    setSelectedRecord(record)
    setIsUpdateModalOpen(true)
  }

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const { data: prices, isSuccess } = useGetAllPricesQuery()

  const { mutate: createPrice } = useCreatePriceQuery()

  const { mutate: updatePrice } = useUpdatePriceByIdQuery()

  const { mutate: removePrice } = useRemovePriceByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить стоимость обучения</Button>
      <PriceForm
        key='create'
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание стоимости'
        btnTitle='Создать'
        onSubmit={createPrice}
      />
      <Divider />
      {selectedRecord && (
        <PriceForm
          key='update'
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование стоимости'
          btnTitle='Обновить'
          initialData={{
            title: selectedRecord.title,
            price_image: selectedRecord.price_image,
            payment_image: selectedRecord.payment_image,
          }}
          onSubmit={updatePrice}
        />
      )}
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

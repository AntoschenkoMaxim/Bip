import { Button, Divider } from 'antd'
import { useState } from 'react'
import { PricesTable } from '../../../modules/PricesTable'
import { CreatePriceForm } from '../../../modules/CreatePriceForm'

export function PricesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Button onClick={showModal}>Добавить стоимость</Button>
      <CreatePriceForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Divider />
      <PricesTable />
    </>
  )
}

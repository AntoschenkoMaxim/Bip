import { Image } from 'antd'
import { useGetAllPricesQuery } from '../../../../hooks/useGetAllPricesQuery'

export function Price() {
  const { data: prices, isSuccess } = useGetAllPricesQuery()

  console.log(prices)

  return (
    <>
      {isSuccess && (
        <>
          {/* <Image src={prices?.rows.price_image} />
          <Image src={prices?.rows.payment_image} /> */}
        </>
      )}
    </>
  )
}

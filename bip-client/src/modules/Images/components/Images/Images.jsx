import { Card, Image, List, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { IMAGES_URL, IMAGE_CATEGORIES_URL } from '../../../../constants/urls'
import { IMAGES_KEY, IMAGE_CATEGORIES_KEY } from '../../../../constants/keys'
const { Meta } = Card

export function Images() {
  const [id, setId] = useState(null)

  const { data: imageCategories } = useGetAllItemsQuery(
    IMAGE_CATEGORIES_URL,
    IMAGE_CATEGORIES_KEY
  )

  const items = imageCategories?.rows.map((item) => ({
    key: item.id,
    label: item.description,
  }))

  const { data: images, isSuccess } = useGetAllItemsQuery(
    IMAGES_URL,
    IMAGES_KEY
  )

  useEffect(() => {
    if (items && !id) {
      setId(items[0].key)
    }
  }, [items, id])

  const getFilteredImages = () => {
    const filteredImages = images?.rows.filter((item) => item.categoryId === id)
    return filteredImages
  }

  const handleChange = (key) => {
    setId(key)
  }

  return (
    <>
      <Tabs items={items} onChange={handleChange} />
      {isSuccess && (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          pagination={{
            pageSize: 6,
          }}
          dataSource={getFilteredImages()}
          renderItem={(item) => (
            <List.Item>
              <Card
                cover={
                  <Image
                    src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
                    alt={item.image}
                  />
                }
              >
                <Meta title={item.title} />
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  )
}

import { Image, List, Tabs, Tag } from 'antd'
import { intlFormatDistance } from 'date-fns'
import { useGetAllPostsCategoriesQuery } from '../../../../hooks/useGetAllPostsCategoriesQuery'
import { useState } from 'react'
import { useGetPostsByCategoryIdQuery } from '../../hooks/useGetPostsByCategoryIdQuery'

export function Posts() {
  const { data: postsCategories } = useGetAllPostsCategoriesQuery()

  const items = postsCategories?.rows.map((item) => ({
    key: item.id,
    label: item.description,
  }))

  const [id, setId] = useState(1)

  const { data: posts, isSuccess } = useGetPostsByCategoryIdQuery(id)

  const onChange = (key) => {
    setId(key)
  }

  return (
    <>
      <Tabs items={items} onChange={onChange} />
      {isSuccess && (
        <List
          itemLayout='vertical'
          size='large'
          pagination={{
            pageSize: 5,
          }}
          dataSource={posts?.rows}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <Image
                  width={150}
                  alt='post-image'
                  src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
                />
              }
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              <Tag color='geekblue'>
                {intlFormatDistance(new Date(item.createdAt), Date.now(), {
                  locale: 'ru',
                })}
              </Tag>
            </List.Item>
          )}
        />
      )}
    </>
  )
}

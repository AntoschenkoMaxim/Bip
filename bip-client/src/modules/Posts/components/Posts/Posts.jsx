import { Image, List, Tabs, Tag } from 'antd'
import { intlFormatDistance } from 'date-fns'
import { useEffect, useState } from 'react'
import { useGetAllPostCategoriesQuery } from '../../../../hooks/useGetAllPostCategoriesQuery'
import { useGetAllPostsQuery } from '../../../../hooks/useGetAllPostsQuery'

export function Posts() {
  const [id, setId] = useState(null)

  const { data: postsCategories } = useGetAllPostCategoriesQuery()

  const items = postsCategories?.rows.map((item) => ({
    key: item.id,
    label: item.description,
  }))

  const { data: posts, isSuccess } = useGetAllPostsQuery()

  useEffect(() => {
    if (items && !id) {
      setId(items[0].key)
    }
  }, [items, id])

  const getFilteredPosts = () => {
    const filteredPosts = posts?.rows.filter(
      (item) => item.postsCategoryId === id
    )
    return filteredPosts
  }

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
          dataSource={getFilteredPosts()}
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

import { Image, Input, List, Tabs, Tag } from 'antd'
import { useEffect, useState } from 'react'
import useListSearch from '../../../../hooks/useListSearch'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { POSTS_URL, POST_CATEGORIES_URL } from '../../../../constants/urls'
import { POSTS_KEY, POST_CATEGORIES_KEY } from '../../../../constants/keys'

export function Posts() {
  const [id, setId] = useState(null)

  const { data: postsCategories } = useGetAllItemsQuery(
    POST_CATEGORIES_URL,
    POST_CATEGORIES_KEY
  )

  const items = postsCategories?.rows.map((item) => ({
    key: item.id,
    label: item.description,
  }))

  const { data: posts, isSuccess } = useGetAllItemsQuery(POSTS_URL, POSTS_KEY)

  useEffect(() => {
    if (items && !id) {
      setId(items[0].key)
    }
  }, [items, id])

  const { searchText, handleSearch, filteredData } = useListSearch(posts?.rows)

  const getFilteredPosts = () => {
    return filteredData.filter((item) => item.postsCategoryId === id)
  }

  const onChange = (key) => {
    setId(key)
  }

  return (
    <>
      <Input
        placeholder='Поиск по заголовку'
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, maxWidth: '20%' }}
      />
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
                {format(new Date(item.date), 'iiii (dd.MM.yyyy)', {
                  locale: ru,
                })}
              </Tag>
            </List.Item>
          )}
        />
      )}
    </>
  )
}

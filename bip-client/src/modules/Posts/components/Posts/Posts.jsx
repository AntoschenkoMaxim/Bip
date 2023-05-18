import { Image, List, Tabs } from 'antd'
import { intlFormatDistance } from 'date-fns'
import { useGetAllPostsQuery } from '../../../../hooks/useGetAllPostsQuery'
import { useGetAllPostsCategoriesQuery } from '../../../../hooks/useGetAllPostsCategoriesQuery'

export function Posts() {
  const { data: posts, isSuccess } = useGetAllPostsQuery()
  const { data: postsCategories } = useGetAllPostsCategoriesQuery()

  const items = postsCategories?.rows.map((item) => ({
    key: item.id,
    label: item.description,
  }))

  return (
    <>
      <Tabs items={items} />
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
                description={intlFormatDistance(
                  new Date(item.createdAt),
                  Date.now(),
                  {
                    locale: 'ru',
                  }
                )}
              />
              {item.description}
            </List.Item>
          )}
        />
      )}
    </>
  )
}

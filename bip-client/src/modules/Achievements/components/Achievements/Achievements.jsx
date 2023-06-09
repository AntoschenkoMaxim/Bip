import { Image, List, Tag } from 'antd'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { ACHIEVEMENTS_URL } from '../../../../constants/urls'
import { ACHIEVEMENTS_KEY } from '../../../../constants/keys'

export function Achievements() {
  const { data: achievements, isSuccess } = useGetAllItemsQuery(
    ACHIEVEMENTS_URL,
    ACHIEVEMENTS_KEY
  )

  return (
    isSuccess && (
      <List
        itemLayout='vertical'
        size='large'
        pagination={{
          pageSize: 5,
        }}
        dataSource={achievements?.rows}
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
            <List.Item.Meta title={item.title} description={item.description} />
            <Tag color='geekblue'>
              {format(new Date(item.createdAt), 'iiii (dd.MM.yyyy)', {
                locale: ru,
              })}
            </Tag>
          </List.Item>
        )}
      />
    )
  )
}

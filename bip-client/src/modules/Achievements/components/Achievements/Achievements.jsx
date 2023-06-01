import { Image, List, Tag } from 'antd'
import { intlFormatDistance } from 'date-fns'
import { useGetAllAchievementsQuery } from '../../../../hooks/useGetAllAchievementsQuery'

export function Achievements() {
  const { data: achievements, isSuccess } = useGetAllAchievementsQuery()

  return (
    <>
      {isSuccess && (
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

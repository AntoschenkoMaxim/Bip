import { useQuery } from 'react-query'
import { getAllPosts } from '../../api/getPostsRequest'
import { List } from 'antd'

export function Posts() {
  const { data: posts } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
    onError: (err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    },
  })

  return (
    <List
      itemLayout='horizontal'
      size='large'
      pagination={{
        pageSize: 5,
      }}
      dataSource={posts?.rows}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            <img
              width={150}
              alt='post-image'
              src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
            />
          }
        >
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  )
}

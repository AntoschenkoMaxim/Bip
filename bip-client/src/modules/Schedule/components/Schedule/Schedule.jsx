import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, Image, theme } from 'antd'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { SCHEDULES_URL } from '../../../../constants/urls'
import { SCHEDULES_KEY } from '../../../../constants/keys'
const { Panel } = Collapse

export function Schedule() {
  const { token } = theme.useToken()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const { data: schedules, isSuccess } = useGetAllItemsQuery(
    SCHEDULES_URL,
    SCHEDULES_KEY
  )

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
    >
      {isSuccess &&
        schedules?.rows.map((item) => (
          <Panel header={item.title} key={item.image} style={panelStyle}>
            <Image
              width={400}
              src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
              alt={item.image}
            />
          </Panel>
        ))}
    </Collapse>
  )
}

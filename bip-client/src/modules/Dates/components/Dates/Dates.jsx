import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, Image, theme } from 'antd'
import { useGetAllDatesQuery } from '../../../../hooks/useGetAllDatesQuery'
const { Panel } = Collapse

export function Dates() {
  const { token } = theme.useToken()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const { data: dates, isSuccess } = useGetAllDatesQuery()

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
        dates?.rows.map((item) => (
          <Panel header={item.title} key={item.title} style={panelStyle}>
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

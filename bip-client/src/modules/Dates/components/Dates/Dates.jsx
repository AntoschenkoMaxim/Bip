import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, Image, theme } from 'antd'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { DATES_URL } from '../../../../constants/urls'
import { DATES_KEY } from '../../../../constants/keys'
const { Panel } = Collapse

export function Dates() {
  const { token } = theme.useToken()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const { data: dates, isSuccess } = useGetAllItemsQuery(DATES_URL, DATES_KEY)

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

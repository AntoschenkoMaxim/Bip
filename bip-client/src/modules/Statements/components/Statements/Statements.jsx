import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, Image, theme } from 'antd'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { STATEMENTS_URL } from '../../../../constants/urls'
import { STATEMENTS_KEY } from '../../../../constants/keys'
const { Panel } = Collapse

export function Statements() {
  const { token } = theme.useToken()

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const { data: statements, isSuccess } = useGetAllItemsQuery(
    STATEMENTS_URL,
    STATEMENTS_KEY
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
        statements?.rows.map((item) => (
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

import { Table, Tag } from 'antd'

export function Price() {
  const sharedOnCell = (_, index) => {
    if (
      index === 0 ||
      index === 1 ||
      index === 4 ||
      index === 9 ||
      index === 10
    ) {
      return {
        colSpan: 0,
      }
    }
    return {}
  }
  const data = [
    {
      type: 'Дневная форма получения образования',
    },
    {
      type: '«Правоведение»',
    },
    {
      type: '1-3 курс',
      price: '3650,00',
      1: '730,00',
      2: '730,00',
      3: '730,00',
      4: '730,00',
      5: '730,00',
    },
    {
      type: '4 курс (выпуск)',
      price: '3250,00',
      1: '650,00',
      2: '650,00',
      3: '650,00',
      4: '650,00',
      5: '650,00',
    },
    {
      type: '«Международное право»',
    },
    {
      type: '1-3 курс',
      price: '3980,00',
      1: '796,00',
      2: '796,00',
      3: '796,00',
      4: '796,00',
      5: '796,00',
    },
    {
      type: '4 курс (выпуск)',
      price: '3460,00',
      1: '692,00',
      2: '692,00',
      3: '692,00',
      4: '692,00',
      5: '692,00',
    },
    {
      type: '1 курс',
      price: 'включительно',
      1: 'по 25.08.22',
      2: 'по 09.11.22',
      3: 'по 10.01.23',
      4: 'по 03.03.23',
      5: 'по 05.05.23',
    },
    {
      type: '2-4 курс',
      price: 'включительно',
      1: 'по 09.09.22',
      2: 'по 09.11.22',
      3: 'по 10.01.23',
      4: 'по 03.03.23',
      5: 'по 05.05.23',
    },
    {
      type: 'Заочная форма получения образования',
    },
    {
      type: '«Правоведение»',
    },
    {
      type: '1-4 курс',
      price: '1610,00',
      1: '805,00',
      2: '805,00',
    },
    {
      type: '4 курс (зимний выпуск)',
      price: '990,00',
      1: '495,00',
      2: '495,00',
    },
    {
      type: '5 курс (выпуск)',
      price: '1440,00',
      1: '720,00',
      2: '720,00',
    },
    {
      type: '1 курс',
      price: 'включительно',
      1: 'по 25.08.22',
      2: 'по 10.01.23',
    },
    {
      type: '2-5 курс',
      price: 'включительно',
      1: 'по 09.09.22',
      2: 'по 10.01.23 ',
    },
  ]
  const columns = [
    {
      title: 'Вид обучения',
      dataIndex: 'type',
      key: 'type',
      onCell: (_, index) => ({
        colSpan:
          index === 0 ||
          index === 1 ||
          index === 4 ||
          index === 9 ||
          index === 10
            ? 7
            : 1,
      }),
    },
    {
      title: 'Стоимость обучения за год, руб.',
      dataIndex: 'price',
      key: 'price',
      onCell: (_, index) => ({
        colSpan:
          index === 0 ||
          index === 1 ||
          index === 4 ||
          index === 9 ||
          index === 10
            ? 0
            : 1,
      }),
    },
    {
      title: 'в том числе по этапам, руб.',
      children: [
        { title: '1', dataIndex: '1', key: '1', onCell: sharedOnCell },
        { title: '2', dataIndex: '2', key: '2', onCell: sharedOnCell },
        { title: '3', dataIndex: '3', key: '3', onCell: sharedOnCell },
        { title: '4', dataIndex: '4', key: '4', onCell: sharedOnCell },
        { title: '5', dataIndex: '5', key: '5', onCell: sharedOnCell },
      ],
    },
  ]

  return (
    <Table
      tableLayout='fixed'
      bordered
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  )
}

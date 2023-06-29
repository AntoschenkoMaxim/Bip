import { Error404 } from '../../../modules/Error404'

export function Error404Page() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Error404 />
    </div>
  )
}

import { LoginForm } from '../../../modules/LoginForm'

export function LoginPage({ onLogin }) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm onLogin={onLogin} />
    </div>
  )
}

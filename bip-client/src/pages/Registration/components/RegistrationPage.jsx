import { RegistrationForm } from '../../../modules/RegistrationForm'

export function RegistrationPage({ onRegistration }) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RegistrationForm onRegistration={onRegistration} />
    </div>
  )
}

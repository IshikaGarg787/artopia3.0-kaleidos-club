import { CONFIG } from '../config/eventConfig.js';
import { useRegistration } from '../context/RegistrationContext.jsx';

/** One reusable Register button. Every one opens the same registration form. */
export default function RegisterButton({ className = 'btn', children = 'Register now ↗', ...rest }) {
  const { open } = useRegistration();
  const closed = CONFIG.registration.status === 'closed';
  return (
    <button
      type="button"
      className={className}
      onClick={open}
      disabled={closed}
      aria-haspopup="dialog"
      aria-label={closed ? 'Registrations are closed' : 'Register for Artopia 3.0 (opens the registration form)'}
      {...rest}
    >
      {closed ? 'Registrations closed' : children}
    </button>
  );
}

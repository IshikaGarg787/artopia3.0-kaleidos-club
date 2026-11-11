import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import RegistrationModal from '../components/RegistrationModal.jsx';

const Ctx = createContext({ open: () => {} });
export const useRegistration = () => useContext(Ctx);

/** Wrap the app once. Any <RegisterButton/> opens the same registration form. */
export function RegistrationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const value = useMemo(() => ({ open }), [open]);
  return (
    <Ctx.Provider value={value}>
      {children}
      {isOpen && <RegistrationModal onClose={() => setIsOpen(false)} />}
    </Ctx.Provider>
  );
}

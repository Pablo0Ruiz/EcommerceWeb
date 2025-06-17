import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const useToastMessages = () => {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const message = searchParams.get('message');
    
    if (message) {
      switch (message) {
        case 'guest_restricted':
          toast.error('Los usuarios invitados no pueden acceder a esta sección. Por favor, inicia sesión.');
          break;
        case 'no_token':
          toast.error('Debes iniciar sesión para acceder a esta página.');
          break;
        case 'admin_access_denied':
          toast.error('No tienes permisos para acceder al panel de administración.');
          break;
        case 'seller_access_denied':
          toast.error('No tienes permisos para acceder al panel de vendedor.');
          break;
        case 'user_access_denied':
          toast.error('No tienes permisos para acceder a esta sección de usuario.');
          break;
        case 'invalid_token':
          toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          break;
        default:
          break;
      }
    }
  }, [searchParams]);
};

export default useToastMessages;
import { useRouter } from 'next/navigation';
import { PutProfile } from '../services/profile';
import { RegisterData } from '@/modules/auth/typesAuth';

export const useProfile = (reset: () => void) => {
    const router = useRouter();
const onSubmit = async (data: Partial<RegisterData>) => {
    try {
        const updatedUser = await PutProfile(data);
        // Do something with updatedUser if needed
        console.log('Updated user data:', updatedUser);
        
        alert('Perfil actualizado correctamente');
        router.push('/user/profile');
        reset();
    } catch (error) {
        console.error('Error en useProfile:', error);
        alert(error instanceof Error ? error.message : 'Error desconocido al actualizar perfil');
    }
}
    return { onSubmit };
}
import { useRouter } from 'next/navigation';
import { PutProfile } from '../services/profile';


export const useProfile = (reset: () => void) => {

    const router = useRouter();

    const onSubmit = async (data: unknown) => {
        try {
            const response = await PutProfile(data)
            if (!response) { throw new Error('Error al actualizar!') }
            router.push('/perfil(crear esta ruta)')
            reset()
        } catch (error) {
            console.error(error);
        }
    }

    return {onSubmit}
}

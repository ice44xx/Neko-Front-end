import dashboardService from '@/services/dashboardService';
import { useRouter } from 'next/router';

const handleConfirmDeleteUser = async (id: number) => {
  const router = useRouter();
  try {
    await dashboardService.deleteUser(id);
    setTimeout(() => {
      router.reload();
    }, 1000);
  } catch (error) {
    alert('não foi possível deletar o usuário');
  }
};

export default handleConfirmDeleteUser;

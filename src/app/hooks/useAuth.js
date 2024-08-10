import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const useAuth = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();



  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/session');
        if (response.data?.user) {
          setSession(response.data);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { session, loading };
};

export default useAuth;

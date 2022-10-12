import { User } from 'pocketbase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client } from '../lib/pocketbase';

const useUser = () => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const { authStore } = client;
    const { model, isValid } = authStore;
    if (!model && !isValid && (!router.pathname.includes('login') && !router.pathname.includes('signup'))) {
      router.replace('/login');
    } else if (model && isValid && (router.pathname.includes('login') || router.pathname.includes('signup'))) {
      router.replace('/');
    } else {
      setUser(authStore.model as User);
    }
  }, [router]);

  return { user };
};

export default useUser;

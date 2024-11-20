import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Policy } from '../types';
import { getPolicyById } from '../api';

export default function usePolicyById() {
  const { id } = useParams<{ id: string }>();
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [counter, setCounter] = useState(1);
  const invalidate = () => setCounter((prev) => prev + 1);

  useEffect(() => {
    if (id) {
      getPolicyById(Number(id)).then((data) => {
        setPolicy(data);
      });
    }
  }, [id, counter]);
  return { policy, invalidate };
}

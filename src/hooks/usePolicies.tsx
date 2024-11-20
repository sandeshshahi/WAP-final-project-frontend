import { useEffect, useState } from 'react';
import { getAllPolicies } from '../api';
import { Policy } from '../types';

function usePolicies() {
  const currentYear = new Date().getFullYear();

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [from, setFrom] = useState<string>(currentYear.toString());
  const [to, setTo] = useState<string | undefined>(currentYear.toString() + 1);

  const handleSelection = (selected: string[]) => {
    setFrom(selected[0]);
    setTo(selected[1]);
  };

  useEffect(() => {
    getAllPolicies(from, to).then((data) => {
      setPolicies(data);
    });
  }, [from, to]);
  return { policies, handleSelection };
}

export default usePolicies;

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import { verifyUserVote } from '../api';

function useCheckVoteStatus() {
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const policyId = useParams<{ id: string }>().id;
  const [counter, setCounter] = useState(0);

  const invalidate = () => {
    setCounter((prev) => prev + 1);
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id && policyId) {
      verifyUserVote(user?.id, Number(policyId)).then((data) => {
        setHasVoted(data.voted);
      });
    }
  }, [user?.id, policyId, counter]);

  return { hasVoted, invalidate };
}

export default useCheckVoteStatus;

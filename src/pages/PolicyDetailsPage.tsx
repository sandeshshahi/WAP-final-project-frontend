import { useContext } from 'react';
import Avatar from '../components/avatar/Avatar';
import useCheckVoteStatus from '../hooks/useCheckVoteStatus';
import usePolicyById from '../hooks/usePolicyById';
import AuthContext from '../contexts/AuthContext';
import { upVotePolicy } from '../api';
import { categories } from '../constants/categories';

export default function PolicyDetailsPage() {
  const { policy, invalidate } = usePolicyById();

  const { isAuthenticated } = useContext(AuthContext);
  const { hasVoted, invalidate: invalidateVote } = useCheckVoteStatus();

  const matchCategory = categories.find(
    (cat) => cat.name.toLowerCase() === policy?.category.toLowerCase()
  );

  const handleUpVote = () => {
    console.log('xyz');
    upVotePolicy(Number(policy?.id)).then(() => {
      invalidate();
      invalidateVote();
    });
  };

  const tooltipMessage = !isAuthenticated
    ? 'You must be logged in to vote.'
    : hasVoted
      ? 'You have already voted.'
      : '';

  return (
    <>
      <div className="container mx-auto md:px-48 flex flex-col p-4">
        {/* headings */}
        <div className="flex flex-col gap-y-2 px-4 py-1 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <div className="min-w-0 flex-auto">
              <p className="text-xl font-semibold text-gray-900">
                {policy?.title}
              </p>
              <div className="flex flex-row gap-x-2">
                <span
                  className={`mt-1 truncate text-xs/5 text-white rounded-md px-4 capitalize ${matchCategory?.color || 'bg-gray-400'}`}
                >
                  {policy?.category}
                </span>
                <p className="mt-1 truncate text-sm text-gray-900">
                  {policy?.vote || 0} votes
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="flex items-center justify-center border border-indigo-500 h-12 w-28 text-indigo-600 rounded-sm text-lg font-semibold">
                {policy?.vote || 0}
              </span>
              <div className="relative group flex flex-col items-center">
                <button
                  type="button"
                  disabled={!isAuthenticated || hasVoted}
                  onClick={handleUpVote}
                  className={`bg-indigo-600 text-white h-12 w-28 rounded cursor-pointer flex items-center justify-center hover:bg-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  Vote
                </button>

                {tooltipMessage && (
                  <div className="absolute top-full mt-2 hidden group-hover:block bg-gray-700 text-white text-sm rounded px-2 py-1 whitespace-nowrap">
                    {tooltipMessage}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-700 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center border-t-2 border-gray-200 pt-2">
            <div className="flex gap-1">
              <Avatar name={policy?.name || 'User'} />
              <p className="text-base font-semibold text-gray-900">
                {policy?.name}
              </p>
            </div>
            <div>
              <span className="text-base font-semibold text-gray-900">
                {policy?.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* content section */}
        <div className="flex items-center justify-center pl-16 pr-4">
          <p>{policy?.description}</p>
        </div>
      </div>
    </>
  );
}

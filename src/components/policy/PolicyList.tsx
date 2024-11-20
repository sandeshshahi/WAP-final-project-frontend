import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import CustomSelect from './CustomSelect';
import { Policy } from '../../types';
import usePolicies from '../../hooks/usePolicies';
import { categories } from '../../constants/categories';

const Row = ({ policy }: { policy: Policy }) => {
  const matchCategory = categories.find(
    (cat) => cat.name.toLowerCase() === policy.category.toLowerCase()
  );

  return (
    <tr className="border border-b-2 border-t-0 border-l-0 border-r-0 border-gray-100 ">
      <td className="gap-x-6 py-4 px-6">
        <div className="min-w-0 flex-auto">
          <Link
            to={`/policies/${policy.id}`}
            className="text-base/8 font-semibold text-gray-900 hover:text-indigo-600"
          >
            {policy.title}
          </Link>
          <div className="flex flex-row gap-x-2">
            <span
              className={`mt-1 truncate text-xs/5 text-white  rounded-md px-4 capitalize ${matchCategory?.color || 'bg-gray-400'}`}
            >
              {policy.category}
            </span>
            <p className="mt-1 truncate text-xs/5 text-gray-500">
              Created by {policy.name}
            </p>
          </div>
        </div>
      </td>
      <td className="text-center text-base/8 font-semibold text-gray-900">
        {policy.vote}
      </td>
      <td className="text-center text-base/8 font-semibold text-gray-900">
        {new Date(policy.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </td>
    </tr>
  );
};
export default function PolicyList() {
  const currentYear = new Date().getFullYear();
  const rangeCount = 6;
  const dateOptions = Array.from({ length: rangeCount }, (_, index) => {
    const startYear = currentYear - index; // Start year of the range
    const endYear = startYear + 1; // End year of the range
    return `${startYear} - ${endYear}`;
  });

  const { isAuthenticated } = useContext(AuthContext);

  const { policies, handleSelection } = usePolicies();

  return (
    <div className="container mx-auto md:px-48">
      {/* academic year dropdown */}
      <div className="flex w-full justify-between mb-6 items-center">
        <CustomSelect options={dateOptions} onSelect={handleSelection} />

        {isAuthenticated && (
          <Link to="/policies/add">
            <button
              className="bg-indigo-600 text-white p-3 px-5 rounded cursor-pointer flex items-center justify-center hover:bg-indigo-500"
              type="button"
            >
              <span className="text-xl font-semibold">+&nbsp; &nbsp;</span>New
              Policy
            </button>
          </Link>
        )}
      </div>
      {/* policy list table */}
      <table className="table-auto w-full">
        <thead className="border border-b-2 border-t-0 border-l-0 border-r-0 border-gray-400">
          <tr className="text-left text-lg/9 font-semibold text-gray-900">
            <th className="px-6 py-1">Policy</th>
            <th className="w-[15%] text-center">Votes</th>
            <th className="w-[15%] text-center">Created</th>
          </tr>
        </thead>
        <tbody className="">
          {policies.map((policy) => (
            <Row key={policy.id} policy={policy} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

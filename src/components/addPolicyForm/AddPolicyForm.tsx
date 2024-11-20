import { useContext, useEffect, useState } from 'react';
import InputField from '../controls/inputFields/InputField';
import TextAreaField from '../controls/inputFields/TextAreaField';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createPolicy } from '../../api';
import { categories } from '../../constants/categories';

interface PolicyError {
  title?: string;
  description?: string;
  date?: string;
  category?: string;
}

export default function AddPolicyForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState<PolicyError>({});
  const navigate = useNavigate();

  // const categories = [
  //   'General',
  //   'Food',
  //   'Library',
  //   'Meditation',
  //   'Education',
  //   'Visa',
  //   'Travel',
  //   'Students Lounge',
  //   'Others',
  // ];
  console.log(error);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error: PolicyError = {};
    if (!title) {
      error.title = 'Title is required';
    }
    if (!description) {
      error.description = 'Description is required';
    }
    if (!date) {
      error.date = 'Date is required';
    }
    if (!category) {
      error.category = 'Category is required';
    }
    setError(error);
    if (Object.keys(error).length) return;
    await createPolicy({ title, description, date: new Date(date), category });
    navigate('/');
  };
  return (
    <div className="container mx-auto p-4">
      <div className="px-4 sm:px-0 ">
        <h3 className="text-2xl font-semibold text-gray-900">
          New Policy Form
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Policy details.{' '}
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <form className="divide-y divide-gray-100" onSubmit={handleSubmit}>
          <InputField
            name="title"
            label="Title"
            id="title"
            layout="horizontal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={error.title}
          />
          <TextAreaField
            name="description"
            label="Description"
            id="description"
            layout="horizontal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={error.description}
          />
          <InputField
            name="date"
            label="Date"
            id="date"
            type="date"
            layout="horizontal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={error.date}
          />

          {/* category */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="category-select"
            >
              Category
            </label>
            <select
              className={`block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${error.category ? 'ring-2 ring-inset ring-red-600' : ''}`}
              id="category-select"
              name="category"
              title="category"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">--Please choose an option--</option>
              {categories.map((item, index) => (
                <option key={index} value={item.name.toLowerCase()}>
                  {item.name}
                </option>
              ))}
            </select>
            {error && <div className="text-red-600">{error.category}</div>}
          </div>

          <div className="flex justify-end items-end px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="flex justify-center rounded-md bg-indigo-600 px-8 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

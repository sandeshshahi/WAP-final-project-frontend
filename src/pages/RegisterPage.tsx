import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/controls/inputFields/InputField';
import { useContext, useState } from 'react';
import { register } from '../api';
import AuthContext from '../contexts/AuthContext';
import NotificationContext from '../contexts/NotificationContext';

interface RegisterError {
  name?: string;
  email?: string;
  password?: string;
}

const RegisterPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setAlert } = useContext(NotificationContext);

  const [error, setError] = useState<RegisterError>({});
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error: RegisterError = {};
    if (!name) {
      error.name = 'Name is required';
    }
    if (!email) {
      error.email = 'Email is required';
    }
    if (!password) {
      error.password = 'Password is required';
    }
    setError(error);
    if (Object.keys(error).length) return;

    try {
      const response = await register({ name, email, password });
      login(response);
      setAlert({
        message: 'User registered successfully, logged in automatically.',
        type: 'success',
      });
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
      setAlert({
        message: 'An error occurred. Please try again.',
        type: 'error',
      });
    }
  };

  //hide alert banner after 3 secs

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register a new account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              name="name"
              id="name"
              label="Name"
              value={name}
              onChange={(e) => {
                const inputValue = e.target.value;
                const capitalizedValue = inputValue
                  .split(' ')
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(' ');
                setName(capitalizedValue);
              }}
              error={error.name}
            />

            <InputField
              name="email"
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error.email}
            />

            <InputField
              name="password"
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error.password}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

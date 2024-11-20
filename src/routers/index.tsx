import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/layouts/RootLayout';
import LandingPage from '../pages/LandingPage';
import SigninPage from '../pages/SigninPage';
import AddPolicyForm from '../components/addPolicyForm/AddPolicyForm';
import RegisterPage from '../pages/RegisterPage';
import PolicyDetailsPage from '../pages/PolicyDetailsPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: 'login',
          element: <SigninPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: 'policies/:id',
          element: <PolicyDetailsPage />,
        },
        {
          path: 'policies/add',
          element: <AddPolicyForm />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;

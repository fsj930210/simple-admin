import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_URL,
});

export default router;

import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './util/http.js';

import Notes from './routes/Notes';
import NewNote from './routes/NewNote';
import NoteDetails from './routes/NoteDetails';
import RootLayout from './routes/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Notes />,
        children: [
          { path: '/create-note', element: <NewNote /> },
          {
            path: '/:id',
            element: <NoteDetails />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

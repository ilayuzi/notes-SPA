import { Outlet } from 'react-router-dom';

import NotesList from '../components/NotesList';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../util/http';
import ErrorBlock from '../UI/ErrorBlock';
import LoadingIndicator from '../UI/LoadingIndicator';

function Notes() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['notes'],
    queryFn: ({ signal }) => fetchNotes({ signal }),
    staleTime: 300000, // 5 minutes in milliseconds
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.message || 'failed to fetch notes'}
      />
    );
  }

  if (data) {
    content = <NotesList notes={data.notes} />;
  }

  return (
    <>
      <Outlet />
      <main>{content}</main>
    </>
  );
}

export default Notes;

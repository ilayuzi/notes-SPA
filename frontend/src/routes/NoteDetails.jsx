import { useLoaderData, Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './NoteDetails.module.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteNote, fetchNote, queryClient } from '../util/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';

function NoteDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['notes', params.id],
    queryFn: ({ signal }) => fetchNote({ signal, id: params.id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      navigate('..');
    },
  });

  function handleDelete() {
    mutate({ id: params.id });
  }

  const note = data;
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="failed to load event"
          message={error.info?.message || 'failed to fetch data'}
        />
      </div>
    );
  }

  if (note) {
    content = (
      <main className={classes.details}>
        <p className={classes.title}>{note.title}</p>
        <p className={classes.text}>{note.text}</p>
        <p className={classes.text}>{note.date}</p>
        <button onClick={handleDelete} className="button">
          Delete
        </button>
      </main>
    );
  }

  return <Modal>{content}</Modal>;
}

export default NoteDetails;

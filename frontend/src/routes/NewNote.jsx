import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import classes from './NewNote.module.css';
import Modal from '../components/Modal';
import { useMutation } from '@tanstack/react-query';
import { createNewNote, queryClient } from '../util/http';
import ErrorBlock from '../UI/ErrorBlock';

function NewNote() {
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationFn: createNewNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      navigate('..');
    },
  });

  const currentDate = new Date();

  // Function to format the date as "dd/mm/yy"
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const [currentDateString] = useState(formatDate(currentDate));

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    mutate(data);
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit} className={classes.form}>
        <p>
          <label htmlFor="title">Title</label>
          <textarea id="title" name="title" required rows={1} />
        </p>
        <p>
          <label htmlFor="text">Text</label>
          <textarea id="text" name="text" required rows={3} />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            value={currentDateString}
            readOnly
          />
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button type="submit">Submit</button>
        </p>
      </form>
      {isError && (
        <ErrorBlock
          title="failed to create note"
          message={
            error.message || 'failed to create note. please check your input'
          }
        />
      )}
    </Modal>
  );
}

export default NewNote;

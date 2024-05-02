import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function fetchNotes({ signal }) {
  const response = await fetch('http://127.0.0.1:3001/api/v1/notes', {
    signal: signal,
  });
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resData = await response.json();
  return resData;
}

export async function createNewNote(noteData) {
  const response = await fetch('http://127.0.0.1:3001/api/v1/notes', {
    method: 'POST',
    body: JSON.stringify(noteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { note } = await response.json();

  return note;
}

export async function fetchNote({ id, signal }) {
  const response = await fetch(`http://127.0.0.1:3001/api/v1/notes/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { note } = await response.json();

  return note;
}

export async function deleteNote({ id }) {
  const response = await fetch(`http://127.0.0.1:3001/api/v1/notes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  // return response.json();
  return null;
}

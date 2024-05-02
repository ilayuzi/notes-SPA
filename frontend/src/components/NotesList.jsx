import Note from './Note';
import classes from './NotesList.module.css';

function NotesList({ notes }) {
  return (
    <>
      {notes.length > 0 && (
        <ul className={classes.notes}>
          {notes.map((note) => (
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              text={note.text}
            />
          ))}
        </ul>
      )}
      {notes.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no notes yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default NotesList;

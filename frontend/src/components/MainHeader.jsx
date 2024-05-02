import { Link } from 'react-router-dom';
import { MdNoteAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        Notes App
      </h1>
      <p>
        <Link to="/create-note" className={classes.button} >
          <MdNoteAdd size={18} />
          New Note
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;

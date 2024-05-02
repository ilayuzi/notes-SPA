import { Link } from 'react-router-dom';

import classes from './Note.module.css';

function Note({ id, title, text }) {
  return (
    <li className={classes.note}>
      <Link to={id}>
        <p className={classes.title}>{title}</p>
        <p className={classes.text}>{text}</p>
      </Link>
    </li>
  );
}

export default Note;

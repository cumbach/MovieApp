import React from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { movies, searchTitle, genre, selectGenre } = this.props;

    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={"nav-link" + (searchTitle.length || genre.length ? "" : " active")} href="">Most Popular</a>
        </li>
        <li className="nav-item dropdown">
          <a className={"nav-link dropdown-toggle" + (genre.length ? " active" : "")} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Genres</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" onClick={() => selectGenre('action')}>Action</a>
            <a className="dropdown-item" onClick={() => selectGenre('adventure')}>Adventure</a>
            <a className="dropdown-item" onClick={() => selectGenre('animation')}>Animation</a>
            <a className="dropdown-item" onClick={() => selectGenre('comedy')}>Comedy</a>
            <a className="dropdown-item" onClick={() => selectGenre('crime')}>Crime</a>
            <a className="dropdown-item" onClick={() => selectGenre('documentary')}>Documentary</a>
            <a className="dropdown-item" onClick={() => selectGenre('drama')}>Drama</a>
            <a className="dropdown-item" onClick={() => selectGenre('family')}>Family</a>
            <a className="dropdown-item" onClick={() => selectGenre('fantasy')}>Fantasy</a>
            <a className="dropdown-item" onClick={() => selectGenre('history')}>History</a>
            <a className="dropdown-item" onClick={() => selectGenre('horror')}>Horror</a>
            <a className="dropdown-item" onClick={() => selectGenre('music')}>Music</a>
            <a className="dropdown-item" onClick={() => selectGenre('mystery')}>Mystery</a>
            <a className="dropdown-item" onClick={() => selectGenre('romance')}>Romance</a>
            <a className="dropdown-item" onClick={() => selectGenre('science_fiction')}>Science Fiction</a>
            <a className="dropdown-item" onClick={() => selectGenre('tv_movie')}>TV Movie</a>
            <a className="dropdown-item" onClick={() => selectGenre('thriller')}>Thriller</a>
            <a className="dropdown-item" onClick={() => selectGenre('war')}>War</a>
            <a className="dropdown-item" onClick={() => selectGenre('western')}>Western</a>
          </div>
        </li>
        <li className="nav-item">
          <a className={"nav-link" + (searchTitle.length ? " active" : " disabled")}>Search</a>
        </li>
      </ul>
    );
  }
}

export default Nav;

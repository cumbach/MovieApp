import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { genres } from '../../utils/genres';
import Nav from './Nav';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.selectGenre = this.selectGenre.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;

    if (this.props.movies.length === 0) {
      axios('http://localhost:8000/api/movies')
      .then((res) => {
        res.data.genre = '';
        res.data.searchTitle = '';
        onLoad(res.data)
      });
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleSubmit(){
    axios(`http://localhost:8000/api/movies/search/${this.state.search}`)
      .then((res) => {
        res.data.searchTitle = this.state.search;
        res.data.genre = '';
        this.props.onLoad(res.data)
      });
  }

  keyPressed(event){
    if (event.key === "Enter") {
      this.handleSubmit()
    }
  }

  selectGenre(menuItem) {
    axios(`http://localhost:8000/api/movies/genre/${genres[menuItem].id}`)
      .then((res) => {
        res.data.genre = genres[menuItem].name;
        res.data.searchTitle = '';
        this.props.onLoad(res.data)
        this.setState({ search: '' })
      });
  }

  render() {
    const { movies, searchTitle, genre } = this.props;

    return (
      <div className="container">
        <Nav
          selectGenre={(genre) => this.selectGenre(genre)}
          searchTitle={searchTitle}
          genre={genre}
        />
        <div className="row pt-5">
          <div className="input-group mb-3">
            <input
            onChange={(ev) => this.handleChangeField('search', ev)}
            onKeyPress={(ev) => this.keyPressed(ev)}
            value={this.state.search}
            className="form-control"
            placeholder="Search Movies..."
            />
            <div className="input-group-append">
              <button onClick={this.handleSubmit} className="btn btn-outline-primary" id="button-addon2">Search</button>
            </div>
          </div>
        </div>

        <div className="row pt-5">
            <div className="col-12 col-lg-6 offset-lg-3">
              {searchTitle.length ?
                <h1 className="text-center">Search Results: {searchTitle}</h1> :
                (genre.length ? <h1 className="text-center">Genre: {genre}</h1> :
                  <h1 className="text-center">Most Popular Movies</h1>
                )
              }
            </div>
        </div>
        <div className="row pt-5">
          <div className="movie-container">
            {movies.map((movie) => {
              return (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <div className="card my-3" key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid"/>
                    <div className="card-header">
                      {movie.original_title}
                    </div>
                  </div>
                </Link>
              )
            })}
            {movies.length === 0 ?
              <div className="flex-center">
                <h2 className="text-center">No Results</h2>
              </div> :
              null
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  searchTitle: state.movies.searchTitle,
  genre: state.movies.genre,
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

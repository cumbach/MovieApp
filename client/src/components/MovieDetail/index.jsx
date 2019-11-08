import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onDetailsLoad, onCreditsLoad } = this.props;
    const movieId = this.props.match.params.id;

    axios(`http://localhost:8000/api/movies/${movieId}`)
      .then((res) => onDetailsLoad(res.data));

    axios(`http://localhost:8000/api/movies/${movieId}/credits`)
      .then((res) => onCreditsLoad(res.data));
  }

  componentWillUnmount() {
    this.props.onDetailsLoad({ data: {} });
  }

  render() {
    const { movie, credits } = this.props;

    return (
      Object.keys(movie).length === 0 ?
      <div></div> :
      <div className="container">
        <Link to="/" className="back">
          ← Back to Search
        </Link>
        <div className="row py-4">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">{movie.original_title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm movie-image">
            {movie.poster_path? <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/> : null}
          </div>
          <div className="col-sm">
            <strong>Release Date: {movie.release_date}</strong><br/>

            <div className="pt-5">
              <h4>Synopsis:</h4>
              {movie.overview}
            </div>

            <div className="pt-5">
              <h4>Cast:</h4>
              {credits.map(credit => {
                return (
                  <div key={credit.id}>
                    {credit.name}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movies.movie,
  credits: state.movies.credits
});

const mapDispatchToProps = dispatch => ({
  onDetailsLoad: data => dispatch({ type: 'DETAILS_PAGE_LOADED', data }),
  onCreditsLoad: data => dispatch({ type: 'CREDITS_LOADED', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);

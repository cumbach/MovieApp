const router = require('express').Router();
var axios = require('axios');
const API_KEY = '8e9604f215858571f9e9f1a93832f257';
const BASE_URL = 'https://api.themoviedb.org/3/';

router.get('/', (req, res, next) => {
  return axios.get(`${BASE_URL}movie/popular?api_key=${API_KEY}`)
    .then(response => {
      return res.json({
        data: response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/genre/:id', (req, res, next) => {
  return axios.get(`${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=${req.params.id}`)
    .then(response => {
      return res.json({
        data: response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
});


router.get('/search/:searchTerm', (req, res, next) => {
  return axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query='${req.params.searchTerm}'`)
    .then(response => {
      return res.json({
        data: response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id', (req, res, next) => {
  return axios.get(`${BASE_URL}movie/${req.params.id}?api_key=${API_KEY}`)
    .then(response => {
      return res.json({
        data: response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id/credits', (req, res, next) => {
  return axios.get(`${BASE_URL}movie/${req.params.id}/credits?api_key=${API_KEY}`)
    .then(response => {
      return res.json({
        data: response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;

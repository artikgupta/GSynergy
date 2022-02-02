import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

import './stylesheet/style.css';

function Details() {
  let navigateToHome = useNavigate();
  const [data, setData] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4301e88ef8e0ec257630fe77c454eadb&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleNavigation = (e) => {
    navigateToHome('/');
  };
  return (
    <>
      <div className="homeIcon">
        <HomeIcon className="icon" onClick={handleNavigation} />
        <p>Back to home</p>
      </div>
      <div className="container flex-center">
        <div className="card_details">
          <div className="">
            <img
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w300/${data.poster_path}`
                  : 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'
              }
            />
          </div>
          <div className="details ">
            <h1>{data.original_title}</h1>
            <p>{data.vote_average}</p>
            <p>{data.release_date}</p>
            <p>{data.runtime}</p>
            <p>{data.director}</p>
            <p>{data.cast}</p>
            <p className="overview">{data.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;

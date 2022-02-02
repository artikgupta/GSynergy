import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './stylesheet/style.css';

function Lists() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=4301e88ef8e0ec257630fe77c454eadb&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [page]);

  const searchItems = (searchValue) => {
    setValue(searchValue);

    if (searchValue.length > 2) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=4301e88ef8e0ec257630fe77c454eadb&language=en-US&page=1&query=${searchValue}`
      )
        .then((res) => res.json())
        .then((data) => setFilteredData(data));
    }
  };

  const movieList = value.length > 2 ? filteredData : data;
  return (
    <div className="container">
      <div className="search_box ">
        <input
          type="text"
          placeholder="Search your movie"
          value={value}
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>
      <div>
        {movieList?.results && (
          <>
            <div className="flex">
              {movieList?.results.map((v) => {
                return (
                  <div className=" card">
                    <Link to={`/detail/${v.id}`}>
                      <div className="img">
                        <img
                          src={
                            v.poster_path
                              ? `https://image.tmdb.org/t/p/w300/${v.poster_path}`
                              : 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'
                          }
                        />
                      </div>
                      <div className="info">
                        <div className="flex">
                          <h1>{v.title}</h1>
                          <p className="vote">{v.vote_average}</p>
                        </div>
                        <p className="desc">
                          {v.overview.slice(0, 200) + '....'}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="pagination">
              {Array.from(new Array(data?.total_pages)).map((_, i) => (
                <button
                  className="pagination_item"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Lists;

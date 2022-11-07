import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import CastList from "./CastList";
import VideoList from "./VideoList";

import "./detail.scss";
import MovieList from "../../components/movie-list/MovieList";

const Detail = (props) => {
  const [item, setItem] = useState(null);
  const { category, id } = useParams();

  // console.log(category,id);

  useEffect(() => {
    const getDetail = async () => {
      const params = {};
      const response = await tmdbApi.detail(category, { params }, id);

      //   console.log(response);
      setItem(response.data);
    };

    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">
                {item.title || item.name}
              </h1>

              <div className="genres">
                {item.genres.map((value, index) => {
                  return (
                    <span key={index} className="genres__item">
                      {value.name}
                    </span>
                  );
                })}
              </div>

              <p className="overview">{item.overview}</p>

              <div className="cast">
                <div className="section-header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id}/>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
                <VideoList id={item.id}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                  <h2>Similar</h2>  
                </div>
                <MovieList type={'similar'} category={category} id={item.id}/>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;

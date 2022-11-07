import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category } from "../../api/tmdbApi";

import './movie-list.scss';
import MovieCard from "../movie-card/MovieCard";

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

function MovieList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
            break;
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }

      // console.log(response.data.results);
      setItems(response.data.results);
    };

    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              {/* <img
                src={apiConfig.w500Image(item.poster_path)}
                alt={item.title}
              /> */}
              <MovieCard item={item} category={props.category}/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MovieList;

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './movie-card.scss';

const MovieCard = (props) => {
    let items=props.item;

    const link= category[props.category] + '/' + items.id;
    const bg=apiConfig.w500Image(items.poster_path || items.backdrop_path)


    return (
      <Link to={`/${link}`}>
        <div className="movie-card" style={{backgroundImage:`url(${bg})`}}>
            <Button>
                <i className="bx bx-play"></i>
            </Button>    
        </div>
        <h3>{items.title || items.name}</h3>
      </Link>
    );
};

export default MovieCard;
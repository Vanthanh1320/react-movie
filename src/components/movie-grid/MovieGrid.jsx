import React, { useCallback, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import MovieCard from "../movie-card/MovieCard";

import "./movie-grid.scss";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();
  // console.log(keyword);
  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};

        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;

          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
            break;
        }
      } else {
        const params = {
          query:keyword
        };

        response = await tmdbApi.search(props.category, { params });
      }
  // console.log(response);

      setItems(response.data.results);
      setTotalPage(response.data.total_pages);
    };

    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1
      };

      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;

        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
          break;
      }
    } else {
      const params = {
        page: page + 1,
        query:keyword
      };

      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.data.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch keyword={keyword} category={props.category} />
      </div>

      <div className="movie-grid">
        {items.map((item, index) => {
          return (
            <MovieCard item={item} key={index} category={props.category} />
          );
        })}
      </div>

      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};


const MovieSearch=(props)=>{

  // console.log(props.category);
  const [keyword,setKeyword]=useState(props.keyword ? props.keyword : '');
  const navigate=useNavigate();
  // console.log(navigate);
  const goToSearch=useCallback(()=>{
    if(keyword.trim().length > 0){
      navigate(`search/${keyword}`);
    }
  },[props.category,keyword]);

  useEffect(()=>{
    const enterEvent=(e)=>{
      e.preventDefault();

      if(e.keyCode === 13){
        goToSearch()
      }
    }

    document.addEventListener('keyup',enterEvent);

    return(()=>{
      document.removeEventListener('keyup',enterEvent);
    })
  },[keyword,goToSearch])

  return(
    <div className="movie-search">
      <Input 
         type="text"
         placeholder="Enter search"
         value={keyword}
         onChange={(e)=>setKeyword(e.target.value)}
      />

      <Button className="small" onClick={goToSearch}>
        Search  
      </Button>
    </div>
  )
}


export default MovieGrid;

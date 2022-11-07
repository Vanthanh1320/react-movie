import React from "react";
import { useParams } from "react-router-dom";

import HeaderPage from "../components/header-page/HeaderPage";
import { category } from "../api/tmdbApi";
import MovieGrid from "../components/movie-grid/MovieGrid";

const Catalog=()=>{

    const param=useParams();

    return(
        <>
            <HeaderPage>
                {category.movie === param.category ? 'Movie' : 'Tv'}
            </HeaderPage>

            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={param.category}/>    
                </div>    
            </div>
        </>
    )
}

export default Catalog
import React from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";

import { category,movieType,tvType } from "../api/tmdbApi";

const Home=()=>{

    return(
        <div>
            <HeroSlide />
            <div className="container">
                <div className="section">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to='/movie'>
                            <OutlineButton className='small'>
                                View more
                            </OutlineButton>
                        </Link>    
                    </div>
                    <MovieList type={movieType.popular} category={category.movie}/>
                </div>    

                <div className="section">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to='/movie'>
                            <OutlineButton className='small'>
                                View more
                            </OutlineButton>
                        </Link>    
                    </div>
                    <MovieList type={movieType.top_rated} category={category.movie}/>
                </div>  

                <div className="section">
                    <div className="section__header mb-2">
                        <h2>Trending Tv</h2>
                        <Link to='/tv'>
                            <OutlineButton className='small'>
                                View more
                            </OutlineButton>
                        </Link>    
                    </div>
                    <MovieList type={tvType.popular} category={category.tv}/>
                </div>  

                <div className="section">
                    <div className="section__header mb-2">
                        <h2>Top Rated Tv</h2>
                        <Link to='/tv'>
                            <OutlineButton className='small'>
                                View more
                            </OutlineButton>
                        </Link>    
                    </div>
                    <MovieList type={tvType.top_rated} category={category.tv}/>
                </div>  
            </div>
        </div>
    )
}

export default Home
import React,{useState,useEffect,useRef} from "react";
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';
import {useNavigate} from 'react-router-dom';

import tmdbApi,{category,movieType} from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/Button";
import Modal,{ModalContent} from "../modal/Modal";
import './heroSlide.scss';

const HeroSlide=()=>{
    SwiperCore.use([Autoplay]);
    const [movieItem,setMovieItem]=useState([]);

    useEffect(()=>{
        const getMovies=async ()=>{
            const params={pages:1}

            try{
                const response=await tmdbApi.getMoviesList(movieType.popular,{params});
                setMovieItem(response.data.results.slice(0,4));
                // console.log(response);
            }catch{
                console.log('error');
            }
        }

        getMovies();
    },[])

    return(
        <div className="hero-slide">
            
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                grabCursor={true}
                slidesPerView={1}
                autoplay={{delay: 5000}}
            >
                {movieItem.map((item,index)=>{
                    return(
                        <SwiperSlide key={index}>
                            {/* <img src={apiConfig.originalImage(item.backdrop_path)} alt="" /> */}

                            {({isActive})=>(
                                <HeroSlideItem item={item} className={`${isActive ? 'active' :''}`}/>
                            )}
                        </SwiperSlide>
                    )
                })}

            </Swiper>

            {
                movieItem.map((item,index)=>{
                    return(
                        <TrailerModal key={index} item={item}/>
                    )                
                })
            }
        </div>
    )
}

const HeroSlideItem = (props)=>{
    let navigation=useNavigate();

    const item=props.item;
    const background=apiConfig.originalImage(item.backdrop_path);

    const setModalActive=async ()=>{
        const modal=document.querySelector(`#modal_${item.id}`);

        const videos=await tmdbApi.getVideos(category.movie,item.id);

        if(videos.data.results.length > 0){
            const videosrc='https://www.youtube.com/embed/'+videos.data.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src',videosrc);
        }else{
            modal.querySelector('.modal__content').innerHTML='No Trailer';
        }

        modal.classList.toggle('active');
    }

    return(
        <div className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={()=>navigation(`/movie/${item.id}`)}>
                            Watch now    
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>

                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>

        </div>
    )

}

const TrailerModal=(props)=>{
    const iframRef=useRef(null);
    const item=props.item;

    const onClose=()=>{
        iframRef.current.setAttribute('src','');;
    }

    return(
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframRef} width='100%' height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide
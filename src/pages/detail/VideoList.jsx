import React,{useEffect,useState,useRef} from 'react';
import {useParams} from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';

function VideoList(props) {
    const [videos,setVideos]=useState([]);
    const params=useParams();

    useEffect(()=>{
        const getVideos=async ()=>{
            const response=await tmdbApi.getVideos(params.category,props.id);
            setVideos(response.data.results.slice(0,3));
        }

        getVideos();
    },[params.category,props.id]);

    return (
        <>
            {
                videos.map((video,index)=>{
                    return(
                        <Video key={index} item={video}/>
                    )
                })
            }
        </>
    );
}

const Video=(props)=>{
    let item=props.item;
    const iframeRef=useRef(null);
    
    useEffect(()=>{
        let height=iframeRef.current.offsetWidth * 9 / 16 + `px`;
        iframeRef.current.setAttribute('height',height);
    },[])

    return(
        <div className='video'>
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>

            <iframe 
                ref={iframeRef}
                src={`http://www.youtube.com/embed/${item.key}`} 
                frameborder="0" 
                title='video'
                width="100%"/>
        </div>
    )
}

export default VideoList;
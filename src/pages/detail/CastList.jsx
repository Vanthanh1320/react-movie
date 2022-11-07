import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';

import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';

function CastList(props) {
    const params=useParams();
    const [casts,setCasts]=useState([]);

    useEffect(()=>{
        const getCredits=async()=>{
            const response=await tmdbApi.credits(params.category,props.id);
            setCasts(response.data.cast.slice(0,5));
        }
        getCredits();
    },[params.category,props.id]);

    return (
        <div className='casts'>
            {
                casts.map((cast,index)=>{
                    return(
                        <div className="casts__item" key={index}>
                            <div className="casts__item__img" style={{backgroundImage:`url(${apiConfig.w500Image(cast.profile_path)})`}}></div> 
                            <div className="casts__name">{cast.name}</div>   
                        </div>
                    )
                })
            }
        </div>
    );
}

export default CastList;
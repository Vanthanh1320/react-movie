import React,{useRef,useEffect} from "react";
import { Link, useLocation} from "react-router-dom";

import './header.scss';
import logo from '../../assets/tmovie.png';

const headerNav=[
    {
        display:'Home',
        path:'/'
    },
    {
        display:'Movies',
        path:'/movie'
    },
    {
        display:'Tv',
        path:'/tv'
    }
]

const Header=()=>{
    const headerRef=useRef(null);
    const {pathname}=useLocation();

    useEffect(()=>{
        const shrinkHeader=()=>{
            if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
                headerRef.current.classList.add('shrink');
            }else{
                headerRef.current.classList.remove('shrink');
            }
        }

        window.addEventListener('scroll',shrinkHeader);

        return(()=>{
            window.removeEventListener('scroll',shrinkHeader);
        })
    },[])

    const active=headerNav.findIndex((e,i)=>{
        return e.path === pathname
    })

    return(
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="image" />
                    <Link to='/'>tMovies</Link>
                </div>    
                <ul className="header__nav">
                    {
                        headerNav.map((item,index)=>{
                            const {display,path}=item;

                            return(
                                <li key={index} className={active === index ? 'active':''}>
                                    <Link to={path}>{display}</Link>    
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header
import React, { useEffect, useState } from 'react'
import './style.scss';
import { useNavigate} from 'react-router-dom'
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../../componenets/contentWrapper/ContentWrapper';
import Img from '../../../componenets/lazyLoadImage/Img';

const HeroBanner = () => {

  const [background,setBackground]=useState("");
  const [query,setQuery]=useState("");
   const navigate = useNavigate()
  const searcQueryHandler =(event) =>{
   if(event.key=== 'Enter' && query.length > 0){
     navigate(`/search/${query}`);
   }
  };
  const {url}=useSelector((state)=>state.home)
  const {data,loading} =useFetch("/movie/upcoming");
 
   useEffect(()=>{
   const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path; 
    setBackground(bg);
   
   },[data])

  return (

       
  


         <div className="heroBanner">
          { !loading &&<div className="backdrop-img">
         <Img src={background}/>
          </div>}
          <ContentWrapper>
            <div className="opacity-layer"></div>
            <div className="heroBannerContent">
              <span className="tital">Wellcome.</span>
              <span className="subTital">
                Millons Of Movies ,Tv Shows And People To discover.
                Explore Now.
              </span>
              <div className="searchInput">
                <input type="text" 
                  placeholder='Search For Movies Or Tv Show....'
                  onKeyUp={searcQueryHandler}
                  onChange={(e)=>setQuery(e.target.value) }
                />
                <button>Search</button>
              </div>
            </div>
            </ContentWrapper>
          </div>
          
  )
}

export default HeroBanner
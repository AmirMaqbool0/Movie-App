import React, { useState } from 'react'
import ContentWrapper from '../../../componenets/contentWrapper/ContentWrapper'
import SwitchTab from '../../../componenets/switchTab/SwitchTab'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../componenets/carousel/Carousel';


const Popular = () => {
    const [endpoint,setEndpoint]=useState("movie");
    const {data,loading}=useFetch(`/${endpoint}/popular`);
    const onTabChange=(tab)=>{
       setEndpoint(tab === "Movie" ? 'movie' :'tv');

    }
    
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='craouselTital'>What'Popular</span>
            <SwitchTab data={["Movie","Tv Show"]} onTabChange={onTabChange}/>
        </ContentWrapper>
       <Carousel data={data?.results} loading={loading}
       endpoint={endpoint}
       />
    </div>
  )
}

export default Popular;
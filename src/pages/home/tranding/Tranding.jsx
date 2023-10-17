import React, { useState } from 'react'
import ContentWrapper from '../../../componenets/contentWrapper/ContentWrapper'
import SwitchTab from '../../../componenets/switchTab/SwitchTab'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../componenets/carousel/Carousel';


const Tranding = () => {
    const [endpoint,setEndpoint]=useState("day");
    const {data,loading}=useFetch(`/trending/all/${endpoint}`);
    const onTabChange=(tab)=>{
       setEndpoint(tab === "Day" ? 'day' :'week');

    }
    
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='craouselTital'>Trending</span>
            <SwitchTab data={["Day","week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
       <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Tranding;
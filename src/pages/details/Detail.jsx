import React from 'react'
import './style.scss';
import DetailsBanner from './detailsBanner/DetailsBanner';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Cast from './cast/Cast';
import VideosSection from './videoSection/VideoSection';
import Similar from './carousels/Similer';
import Recommendation from './carousels/Recomendations';


const Detail = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data:credits, loading:loadinCridits } = useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div style={{overflow:'hidden'}}>
   <DetailsBanner video={data?.results?.[0] } crew={credits?.crew}/>
    <Cast data={credits?.cast} loading={loadinCridits} />
    <VideosSection data={data} loading={loading} />
    <Similar mediaType={mediaType} id={id} />
    <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Detail
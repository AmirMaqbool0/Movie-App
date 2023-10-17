import "./style.scss";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import PosterFallback from "../../assets/fallback1.jpg";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading,endpoint,title }) => {
  const navigate = useNavigate();
  const carouselContainer = useRef();
  const navigation=(dir)=>{
    const container=carouselContainer.current;
    const scrollAmount =dir === "left" ? container.scrollLeft - (container.offsetWidth +20) :container.scrollLeft + (container.offsetWidth +20)

    container.scrollTo({
      left : scrollAmount,
      behavior:"smooth"
    })
  }
  
  const { url } = useSelector((state) => state.home);
   
  const skt=()=>{
    return(
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock skeleton">
            <span className="title skeleton"></span>
            <span className="date skeleton"></span>
        </div>
      </div>
    )
  }
  return (
    <div className="carousel">
      
      <ContentWrapper>
      {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() =>navigation("left")}
        />

        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() =>navigation("right")}
          
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterurl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div className="carouselItem" onClick={()=>navigate(`/${item.media_type ||  endpoint}/${item.id}`)}>
                  <div className="posterBlock">
                    <Img src={posterurl} />
                   <CircleRating rating={item.vote_average.toFixed(1)}/>
                   <Genres data={item.genre_ids.slice(0,2)}/>
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name }</span>
                    <span className="title">{dayjs(item.release_date).format("MMM D, YYYY")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton"> 
           {skt()}
           {skt()}
           {skt()}
           {skt()}
           {skt()}
           {skt()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;

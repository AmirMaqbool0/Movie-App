import React, { useState } from "react";
import "./style.scss";
import ContentWrapper from "../../../componenets/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../componenets/genres/Genres";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import CircleRating from "../../../componenets/circleRating/CircleRating";
import Img from "../../../componenets/lazyLoadImage/Img";
import { useParams } from "react-router-dom";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../componenets/videoPopUp/VideoPopUp";


const DetailsBanner = ({ video,crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  
  
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const { url } = useSelector((state) => state.home);
  const _genres=data?.genres?.map((g)=>g?.id)
  const director=crew?.filter((f)=> f.job === "Director")
  const writer=crew?.filter((f)=>f.job === "Screenplay" || f.job ==="Writer" || f.job === "Story");
  const [show ,setShow]=useState(false)
  const [videoId ,setVideoId] =useState(null)
  
  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          <ContentWrapper>
          <div className="backdrop-img">
            <Img src={url.backdrop + data?.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <div className="content">
            <div className="left">

            <Img className="posterImg" src={url.backdrop + data?.poster_path} />
            </div>
                
            
            <div className="right">
             <div className="title">
                {
                 `${data?.name || data?.title}
                 (${dayjs(data?.release_date).format("YYYY")}`
                }
             </div>
             <div className="subtitle">
                {data?.tagline}
                
             </div>

             <div className="genres"> <Genres data={_genres}/> </div>
             <div className="row">
              <CircleRating rating={data?.vote_average.toFixed(1)}/>
              <div className="playbtn" onClick={()=>{
                setShow(true)
                setVideoId(video.key)
              }}>
              <PlayIcon/>
              <span className="text">Watch Trailer</span>
              </div>
              
             </div>
             <div className="overview">
              <div className="heading">
                Overview
              </div>
              <div className="description">
                {data?.overview}
              </div>
             </div>

              <div className="info">
                {
                  data?.status && (
                    <div className="infoItem">
                      <span className="text bold"> Status:{" "} </span>
                      <span className="text">{data?.status}</span>
                    </div>
                  )
                }
                {
                  data?.release_date && (
                    <div className="infoItem">
                      <span className="text bold"> Release Date:{" "} </span>
                      <span className="text">{dayjs( data?.release_date).format("MMM D,YYYY")}</span>
                    </div>
                  )
                }
                {
                  data?.runtime && (
                    <div className="infoItem">
                      <span className="text bold"> Run Time:{" "} </span>
                      <span className="text">{toHoursAndMinutes(data?.runtime)}</span>
                    </div>
                  )
                }
              </div>
              {
                director?.length > 0 &&(
                  <div className="info">
                    <span className="text bold">Director:{" "}</span>
                    <span className="text">
                      {
                        director?.map((d,i)=>(
                          <span key={i}>{d.name}
                          {director.length -1 !== i && " , "}
                          </span>
                        ))
                      }
                    </span>
                  </div>
                )
              }
               
               {
                writer?.length > 0 &&(
                  <div className="info">
                    <span className="text bold">Writer:{" "}</span>
                    <span className="text">
                      {
                        writer?.map((d,i)=>(
                          <span key={i}>{d.name}
                          {writer.length -1 !== i && " , "}
                          </span>
                        ))
                      }
                    </span>
                  </div>
                )
              }

{
                data?.created_by?.length > 0 &&(
                  <div className="info">
                    <span className="text bold">Created By:{" "}</span>
                    <span className="text">
                      {
                        data?.created_by?.map((d,i)=>(
                          <span key={i}>{d.name}
                          {data?.created_by.length -1 !== i && " , "}
                          </span>
                        ))
                      }
                    </span>
                  </div>
                )
              }
            </div>
           
          </div>
          <VideoPopup show={show} setshow={setShow}
           id={videoId} setid={setVideoId}
          />
          </ContentWrapper>
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
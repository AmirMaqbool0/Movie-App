import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../componenets/contentWrapper/ContentWrapper";
import Img from "../../../componenets/lazyLoadImage/Img";

const Cast = ({ data, loading }) => {
  const {url} = useSelector((state)=>state.home)

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            { 
             data?.map((item)=>{
                let imgUrl=url.profile +item.profile_path;
                return(
                    <div className="listItem" key={item.id}>
                        <div className="profileImg">
                            <Img src={imgUrl}/>
                        </div>
                        <div className="name">
                            {
                                item.name
                            }
                        </div>
                        <div className="character">
                            {item.character}
                        </div>
                    </div>
                )
             })
            }
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};
export default Cast;

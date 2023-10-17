import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getapiconfiguration,getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/details/Detail";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Header from "./componenets/header/Header";
import NotFound from "./pages/404/NotFound";
import Footer from "./componenets/footer/Footer";


export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchApiConfig();  
     genresCall()
  }, []);
  
  

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
     
      const url = {
        backdrop: res.images.secure_base_url + "w1280",
        poster: res.images.base_url + "w1280",
        profile: res.images.base_url + "w1280"
      };
      dispatch(getapiconfiguration(url));
    });
  };

  const genresCall= async () =>{
    let promises=[];
    let endPoints=["tv" , "movie"];
    let allGeners={};   
      
    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data=await Promise.all(promises);
    
    data.map(({genres})=>{
   return genres.map((item)=>(allGeners[item.id]=item))
    });
    dispatch(getGenres(allGeners))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Detail />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

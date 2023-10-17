import axios from "axios";
const BASE_URL="https://api.themoviedb.org/3";
const TMBD_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGMwZmU0ZmNmMjVjNDAxMzI4MjYyNjI2MThmODIyMSIsInN1YiI6IjY0OGVkMDg5YzJmZjNkMDExY2I5ZDY1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WTWh9GmA-h-sP4_M5HahiFmQzvaklXyuhIMx0wQ4D6Y";
const headers={
    Authorization:"bearer " +
    TMBD_TOKEN,
};
export const fetchDataFromApi=async(url,params)=>{
try{
const {data}=await axios.get(BASE_URL + url,{
    headers,
    params
})
return data;
}catch (err){
console.log(err)
return err;
}
}
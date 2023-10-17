import React from "react";


import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../componenets/carousel/Carousel";


const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title="Similer"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};
export default Similar
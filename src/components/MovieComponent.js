import React from "react";
import './MovieComponent.css';

const HeightImage = 362;

const MovieComponent = (props) => {
    const {Title, Year, imdbID, Type, Poster} = props.movie;
    return(
        <div className='px-2 w-full shadow-lg cursor-pointer bg-white text-center mt-12 rounded-md'>
            <img src={Poster} height={HeightImage} className='CoverImage w-full' alternative=''/>
            <h1 className='text-center font-bold'>{Title}</h1>
            <p>Year: {Year}</p>
            <p>Type: {Type}</p>
        </div>
    )
}

export default MovieComponent;
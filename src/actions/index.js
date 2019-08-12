// add redux actions here

export const getMovieList = (data) => {
    return {
        type: "GETMOVIELIST",
        payload: data
    };
};

export const rmMovie = (data) => {
    return {
        type: "REMOVEMOVIE",
        payload: data
    };
};

export const setMovieDetail = (data) => {
    return {
        type: "SHOWMOVIEDETAIL",
        payload: data
    };
};
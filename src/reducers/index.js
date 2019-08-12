import { combineReducers } from "redux";
const tmp  = [
    {
        "name": "Movie 1",
        "description": "This is description for movie 1",
        "image": "https://cdn.pixabay.com/photo/2019/05/19/10/41/cinema-4213756_960_720.jpg",
        "cast": ["Some Actor", "Actress", "Support"],
        "releaseYear": 2000,
        "genre": ["Drama", "Action"]
    },
    {
        "name": "Movie 2",
        "description": "This is description for movie 2",
        "image": "https://cdn.pixabay.com/photo/2019/05/19/10/41/cinema-4213756_960_720.jpg",
        "cast": ["Some Actor", "Actress", "Support"],
        "releaseYear": 2010,
        "genre": ["Drama", "Action","Comedy"]
    },
    {
        "name": "Movie 3",
        "description": "This is description for movie 3",
        "image": "https://cdn.pixabay.com/photo/2019/05/19/10/41/cinema-4213756_960_720.jpg",
        "cast": ["Some Actor", "Actress", "Support"],
        "releaseYear": 2010,
        "genre": ["Drama", "Action"]
    },
    {
        "name": "Movie 4",
        "description": "This is description for movie 4",
        "image": "https://cdn.pixabay.com/photo/2019/05/19/10/41/cinema-4213756_960_720.jpg",
        "cast": ["Some Actor", "Actress", "Support"],
        "releaseYear": 2000,
        "genre": ["Drama"]
    },
    {
        "name": "Movie 5",
        "description": "This is description for movie 5",
        "image": "https://cdn.pixabay.com/photo/2019/05/19/10/41/cinema-4213756_960_720.jpg",
        "cast": ["Some Actor", "Actress", "Support"],
        "releaseYear": 2000,
        "genre": ["Drama", "Action"]
    }
];

const movies = (state = [], action) => {
    switch(action.type) {
        case "GETMOVIELIST" :
        state = [...tmp];
        return state;
        
        case "REMOVEMOVIE" :
        state.splice(action.payload,1);
        return state;

        default: return state;
    }
}

const app = (state = {}, action) => {
    switch(action.type) {
        case "SHOWMOVIEDETAIL" :
        return Object.assign({},{...state},{movie:action.payload});
        default: return state;
    }
}

export default combineReducers({
    movies:movies,
    app:app
});

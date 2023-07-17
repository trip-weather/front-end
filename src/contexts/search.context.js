import {createContext} from "react";

export const DefaultSearch = {
    data: {
        city: null, minTemp: null, maxTemp: null, period: null
    },
    setData: () => {}
};

const SearchContext = createContext(DefaultSearch);
export default SearchContext;
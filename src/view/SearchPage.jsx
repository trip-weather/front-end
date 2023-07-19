import SuggestHotelsSection from "../components/SuggestHotelsSection";
import SearchBarSection from "../components/SearchBarSection";
import SuggestTownsSection from "../components/SuggestTownsSection";
import axios from "axios";
import {useState} from "react";
import FoundHotelsSection from "../components/FoundHotelsSection";
import {API_URL_FULL} from "../shared/constants";
import SearchContext, {DefaultSearch} from "../contexts/search.context";


function SearchPage() {

    const [foundHotels, setFoundHotels] = useState([]);

    function handleSubmit(data) {
        console.log(data);

        if (data.city == null && data.minTemp == null && data.maxTemp == null && data.period == null) {
            axios.get(`${API_URL_FULL}/suggested-hotels`)
                .then((response) => {
                    console.log(response);
                    setFoundHotels(response.data);
                    // console.log(foundHotels);
                })
                .catch(error => console.error(error));
        } else {
            console.log(data)
            axios.get(`${API_URL_FULL}/search`, {params: data})
                .then((response) => {
                    setFoundHotels(response.data[0].results);
                })
                .catch(error => console.error(error));
        }
    }

    const [searchData, setSearchData] = useState(DefaultSearch.data);

    return (
        <>
            <SearchContext.Provider value={{data: searchData, setData: setSearchData}}>
                <SearchBarSection handleSubmit={handleSubmit}/>
                <SuggestTownsSection handleSubmit={handleSubmit}/>
                <FoundHotelsSection hotels={foundHotels}></FoundHotelsSection>
                <SuggestHotelsSection/>
            </SearchContext.Provider>
        </>
    )
}

export default SearchPage;
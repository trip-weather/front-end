import SuggestHotelsSection from "../components/SuggestHotelsSection";
import SearchBarSection from "../components/SearchBarSection";
import SuggestTownsSection from "../components/SuggestTownsSection";
import {useState} from "react";
import FoundHotelsSection from "../components/FoundHotelsSection";
import SearchContext, {DefaultSearch} from "../contexts/search.context";
import {getSuggestedHotels, searchHotels} from "../services/HotelService";
import {useLocation} from "react-router-dom";

function SearchPage() {
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const selected = queryParams.get('selected')?? null;

    const [foundHotels, setFoundHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState(DefaultSearch.data);
    function handleSubmit(data) {
        console.debug(searchData);

        setIsLoading(true);
        if (data.city == null && data.minTemp == null && data.maxTemp == null && data.period == null) {
            getSuggestedHotels()
                .then((response) => {
                    console.log(response);
                    setFoundHotels(response.data);
                    setIsLoading(false);
                    console.log(foundHotels);
                })
                .catch(error => {
                    console.error(error)
                    setIsLoading(false);
                });
        } else {
            const filters = { ...data, filters: [...data.filters].join(',') };

            searchHotels(filters)
                .then((response) => {
                    console.log(response.data[0].results)
                    console.log(response.data[0].results[0].nearbyFilters)
                    setFoundHotels(response.data[0].results);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error(error)
                    setIsLoading(false);
                    setFoundHotels([]);
                });
        }
    }

    return (
        <>
            <SearchContext.Provider value={{data: searchData, setData: setSearchData}}>
                <SearchBarSection handleSubmit={handleSubmit}/>
                <SuggestTownsSection handleSubmit={handleSubmit} selected={selected}/>
                <FoundHotelsSection isLoading={isLoading} hotels={foundHotels}></FoundHotelsSection>
                <SuggestHotelsSection/>
            </SearchContext.Provider>
        </>
    )
}

export default SearchPage;
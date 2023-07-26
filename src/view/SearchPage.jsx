import SuggestHotelsSection from "../components/SuggestHotelsSection";
import SearchBarSection from "../components/SearchBarSection";
import SuggestTownsSection from "../components/SuggestTownsSection";
import {useState} from "react";
import FoundHotelsSection from "../components/FoundHotelsSection";
import SearchContext, {DefaultSearch} from "../contexts/search.context";
import {getSuggestedHotels, searchHotels} from "../services/HotelService";


function SearchPage() {

    const [foundHotels, setFoundHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchData, setSearchData] = useState(DefaultSearch.data);
    function handleSubmit(data) {
        console.log(data);

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
            console.log(data)
            searchHotels(data)
                .then((response) => {
                    setFoundHotels(response.data[0].results);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error(error)
                    setIsLoading(false);
                });
        }
    }



    return (
        <>
            <SearchContext.Provider value={{data: searchData, setData: setSearchData}}>
                <SearchBarSection handleSubmit={handleSubmit}/>
                <SuggestTownsSection  handleSubmit={handleSubmit}/>
                <FoundHotelsSection isLoading={isLoading} hotels={foundHotels}></FoundHotelsSection>
                <SuggestHotelsSection/>
            </SearchContext.Provider>
        </>
    )
}

export default SearchPage;
import HotelSection from "../layouts/HotelSection";
import SearchBarSection from "../layouts/SearchBarSection";
import { Pagination } from "@mui/material";


function SearchPage() {
    return (
        <>
            <SearchBarSection />
            <HotelSection />
        </>
    )
}

export default SearchPage;
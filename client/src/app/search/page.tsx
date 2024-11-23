"use client";

import React, { useState, useEffect } from 'react'
import { useSearchQuery } from "@/state/api"
import { debounce } from 'lodash'


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { 
         data: searchResults,
         isLoading, 
         isError,
        } = useSearchQuery(searchTerm, {
        skip: searchTerm.length < 3
    });

    const handleSearch = debounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
        },
        500,
    );

    useEffect(() => {
        return handleSearch.cancel;
    }, [handleSearch.cancel])

  return (
    <div>Search</div>
  )
}

export default Search 
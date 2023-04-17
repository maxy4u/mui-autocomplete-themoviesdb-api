import * as React from "react";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import dataService from "./services/dataService";

const { getSearch, getMostVoted } = dataService;
const optionLabel = (option) => option.title;
const groupByVoted = (option) => option.voted;
const groupByPopular = (option) => option.popular;
const addGroupByField = (data) =>
  data.results.map((option) => {
    return {
      voted: option.vote_count > 20000 ? "Above 20K" : "Less Than 20k",
      popular: option.popularity > 5000 ? "Most Popular" : "Average",
      ...option
    };
  });

export default function Grouped() {
  const [newOptions, setNewOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  //----------------------------
  // load on mount
  //----------------------------
  useEffect(() => {
    async function fetchData() {
      const popularMovies = await getMostVoted();
      console.log("popularMovies", popularMovies);
      setNewOptions(addGroupByField(popularMovies));
    }
    fetchData();
  }, []);

  //----------------------------
  // load as user type
  //----------------------------
  useEffect(() => {
    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    async function searchData(query) {
      const movies = await getSearch(query);
      console.log("searched movies", movies);
      setOptions(addGroupByField(movies));
    }

    searchData(inputValue);
  }, [value, inputValue]);

  return (
    <div>
      <Autocomplete
        id="grouped-demo"
        options={newOptions.sort((a, b) => b.vote_count - a.vote_count)}
        groupBy={groupByVoted}
        getOptionLabel={optionLabel}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Load before open" />
        )}
      />
      <br />
      <Autocomplete
        id="grouped-demo-search-on type"
        options={options.sort((a, b) => b.popularity - a.popularity)}
        groupBy={groupByPopular}
        getOptionLabel={optionLabel}
        sx={{ width: 300 }}
        value={value}
        filterOptions={(x) => x}
        noOptionsText="No Movies"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search as you type" />
        )}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
    </div>
  );
}

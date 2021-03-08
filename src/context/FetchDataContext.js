// So, since this is a relatively small application, I will just make use of only one Context File
// Would have loved to make fetch API a reusable component but i'm just gonna leave like that

import { createContext, useCallback, useState } from "react";

export const FetchContext = createContext();
export const data = ["London", "Amsterdam", "New York", "Berlin"];

const FetchDataContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [checked, setChecked] = useState(false);
  const [inputLocation, setInputLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobs = useCallback(() => {
    setLoading(true);
    let url;
    if (location !== "") {
      url = `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?description=&full_time=${checked}&location=${location}`;
    } else {
      url =
        "https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?description=&location=";
    }
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setJobs(res);
        setLoading(false);
      });
  }, [location, checked]);

  const onRadioBtnChange = (e) => {
    setLocation("");
    setLocation(e.target.value);
  };

  const onFormSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const onCheckedBox = (e) => {
    setChecked(e.target.checked);
  };

  function onhandleSearch(e) {
    setInputLocation(e.target.value);
  }

  const onhandleSubmit = (e) => {
    e.preventDefault();
    if (inputLocation) {
      const stringCapitalized =
        inputLocation.charAt(0).toUpperCase() + inputLocation.slice(1);
      if (data.includes(stringCapitalized) === false) {
        data.unshift(stringCapitalized);
        setLocation(stringCapitalized);
        setInputLocation("");
      }
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setLoading(true);
      fetch(
        `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?search=${searchTerm}`
      )
        .then((res) => res.json())
        .then((res) => {
          setJobs(res);
          setSearchTerm("");
          setLoading(false);
        });
    }
  };

  return (
    <FetchContext.Provider
      value={{
        loading,
        jobs,
        fetchJobs,
        location,
        onRadioBtnChange,
        onCheckedBox,
        inputLocation,
        onhandleSearch,
        onhandleSubmit,
        searchTerm,
        onFormSearch,
        onFormSubmit,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export default FetchDataContext;

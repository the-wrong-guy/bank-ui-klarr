import React, { useEffect, useState, useRef } from "react";
import {
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { DebounceInput } from "react-debounce-input";
import BankTable from "./dataTable/bankTable";
import { useSelector,useDispatch } from "react-redux";
import {setFavBanks} from './Redux/Action/action'
import FavBankTable from "./dataTable/favBankTable";


function App() {
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [qCity, setQcity] = useState("MUMBAI");
  const cache = useRef({});
  const favBanks = useSelector((state) => state.favBanks);

  useEffect(() => {
    function fetchData(){
      const data = JSON.parse(localStorage.getItem(qCity))
      dispatch(setFavBanks(data))
    }
    fetchData()
    return fetchData
  }, [qCity])

  const caching = async () => {
    try {
      if (cache.current[qCity]) {
        const data = cache.current[qCity];
        setData(data);
        return;
      } else {
        const response = await fetch(
          `https://vast-shore-74260.herokuapp.com/banks?city=${qCity}`
        );
        const data = await response.json();
        cache.current[qCity] = data;
        setData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsub = caching();
    return unsub;
  }, [qCity]);


  // const [favBankData,setFavBankData] = useState(JSON.parse(localStorage.getItem(qCity)))

  const search = (rows) => {
    const columns = data[0] && Object.keys(data[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(query?.toLowerCase()) >
          -1
      )
    );
  };

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <AppBar style={{ backgroundColor: "#252525" }}>
        <Toolbar>
          <Typography align="center" variant="h5">
            Bank Details
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "100px",
          marginBottom: "50px",
          gap: "35px"
        }}>
        <Paper
          elevation={3}
          style={{
            width: "378px",
            height: "45px",
            borderRadius: "100px",
            display: "flex"
          }}>
          <DebounceInput
            debounceTimeout={300}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by all fields..."
            style={{
              boxSizing: "border-box",
              flex: "1",
              height: "100%",
              outline: "none",
              border: "none",
              borderRadius: "100px",
              padding: "7px 19px",
              fontSize: "1rem"
            }}
            small
          />
          {query && (
            <IconButton onClick={() => setQuery("")}>
              <CancelIcon />
            </IconButton>
          )}
        </Paper>
        <FormControl size="small" variant="outlined" style={{ width: "200px" }}>
          <InputLabel>Select City</InputLabel>
          <Select
            value={qCity}
            onChange={(e) => setQcity(e.target.value)}
            label="Select City">
            <MenuItem value={"MUMBAI"}>Mumbai</MenuItem>
            <MenuItem value={"GUWAHATI"}>Guwahati</MenuItem>
            <MenuItem value={"IMPHAL"}>Imphal</MenuItem>
            <MenuItem value={"DIMAPUR"}>Dimapur</MenuItem>
            <MenuItem value={"DELHI"}>Delhi</MenuItem>
          </Select>
        </FormControl>
      </div>
      {data   && (
        <div style={{ width: "100%", position: "relative" }}>
          <BankTable rows={search(data)}  />
        </div>
      )}
      { favBanks ?  <div style={{ width: "100%", position: "relative" }}>
          <FavBankTable city={qCity} rows={favBanks} />
        </div> : ''
      }
    </div>
  );
}

export default React.memo(App);


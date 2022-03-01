import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Grid } from "@material-ui/core";

import KitchenCard from "./KitchenCard/KitchenCard";
import axios from "../../axios";
import "./KitchenList.css";
import * as Bsicons from "react-icons/bs";
import * as Biicons from "react-icons/bi";
import { Button, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  button: {
    width: "20px",
    height: "50px",
    fontSize: "2rem",
  },
  card: {
    width: "100%",
  },
});

export default function KitchenList(props) {
  const [kitchens, setKitchens] = useState([]);
  const [searchKitchen, setsearchKitchen] = useState("");

  let match = useRouteMatch();
  const classes = useStyle();

  useEffect(() => {
    axios.get("/kitchen/details").then((res) => {
      if (res.status === 200) {
        setKitchens(Object.values(res.data));
      }
    });
  }, []);

  const setAvailablityHandler = (id) => {
    props.setKitchens((prevState) => {
      const updatedItem = { ...prevState };
      updatedItem[id].available = !prevState[id].available;
      return updatedItem;
    });
  };

  const searchHandler = (event) => {
    setsearchKitchen(event.target.value);
  };

  return (
    <div className="kitchen-list">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={9}>
            <div className="kitchen-control__search-bar">
              <input
                type="text"
                name="search"
                placeholder="Search"
                value={searchKitchen}
                onChange={searchHandler}
              />
              <Bsicons.BsSearch className="search-icon" />
            </div>
          </Grid>
          <Grid
            item
            container
            xs={3}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Biicons.BiSlider className="filter" />
            <Link to={`${match.url}/new-kitchen`}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                +
              </Button>
            </Link>
          </Grid>
        </Grid>

        {kitchens !== null &&
          kitchens.map((kitchen, idx) => (
            <Grid item key={idx} className={classes.card}>
              <KitchenCard
                _id={kitchen["_id"]}
                id={idx}
                name={kitchen["kitchen name"]}
                address={kitchen.address}
                rating={kitchen.rating}
                email={kitchen.email}
                contact={kitchen.Phone}
                price={kitchen.price}
                available={kitchen.available}
                setAvailablity={setAvailablityHandler}
                selectKitchen={() => props.selectKitchen(kitchen["_id"])}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

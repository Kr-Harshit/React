import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Button, makeStyles } from "@material-ui/core";
import axios from "axios";

import "./KitchenDetails.css";
import OrderTimeTable from "./OrderTimeTable";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: "7rem",
    margin: theme.spacing(1),
  },
  saveBtn: {
    backgroundColor: "#5cb85c",
  },
}));

export default function AddKitchen() {
  const [data, setData] = useState({
    img: "",
    "kitchen name": "",
    Owner: "",
    address: "",
    Phone: "",
    email: "",
    FSSAI: "",
    available: false,
    "prep time": "",
    place: {
      "North Eastern": false,
      Bengali: false,
      Kashmiri: false,
      "South Indian": false,
      Punjabi: false,
      Mahrastrian: false,
      Bihari: false,
      Gujarati: false,
      Rajasthani: false,
    },
    Order: {
      breakfast: {
        from: "06:30",
        to: "08:30",
      },
      lunch: {
        from: "12:30",
        to: "14:30",
      },
      hightea: {
        from: "15:30",
        to: "16:30",
      },
      dinner: {
        from: "18:30",
        to: "20:30",
      },
    },
  });
  const classes = useStyles();
  const places = [
    "North Eastern",
    "Bengali",
    "Kashmiri",
    "South Indian",
    "Punjabi",
    "Mahrastrian",
    "Bihari",
    "Gujarati",
    "Rajasthani",
  ];

  const addPlaceHandler = (itm) => {
    setData((prevState) => {
      const updateState = { ...prevState };
      updateState.place[itm] = !prevState.place[itm];
      return updateState;
    });
  };

  const addAvailiblityHandler = () => {
    setData((prevState) => {
      const updateState = { ...prevState };
      updateState.available = !prevState.available;
      return updateState;
    });
  };

  const addOrderTimeHandler = async (itm, interval, session) => {
    setData((prevState) => {
      const updateState = { ...prevState };
      updateState.Order[interval][session] = itm;
      return updateState;
    });
  };

  const addDataHandler = (event, itm) => {
    setData((prevState) => {
      const updateState = { ...prevState };
      updateState[itm] = event.target.value;
      return updateState;
    });
  };

  const dataSubmitHandler = (event) => {
    event.preventDefault();
    const newKitchen = {
      ...data,
    };

    axios.post("/kitchen/create", newKitchen).then(
      setData({
        img: "",
        "kitchen name": "",
        Owner: "",
        address: "",
        Phone: "",
        email: "",
        FSSAI: "",
        available: false,
        "prep time": "",
        place: {
          "North Eastern": false,
          Bengali: false,
          Kashmiri: false,
          "South Indian": false,
          Punjabi: false,
          Mahrastrian: false,
          Bihari: false,
          Gujarati: false,
          Rajasthani: false,
        },
        Order: {
          breakfast: {
            from: "06:30",
            to: "08:30",
          },
          lunch: {
            from: "12:30",
            to: "14:30",
          },
          hightea: {
            from: "15:30",
            to: "16:30",
          },
          dinner: {
            from: "18:30",
            to: "20:30",
          },
        },
      })
    );
  };

  const checkboxes = places.map((p) => {
    return (
      <Grid item xs={4} key={p}>
        <div className="place">
          <input
            type="checkbox"
            name="place"
            id={p}
            checked={data.place[p]}
            onClick={() => addPlaceHandler(p)}
          />
          <label>{p}</label>
        </div>
      </Grid>
    );
  });

  // console.log(data)

  return (
    <div className="kitchen" onSubmit={dataSubmitHandler}>
      <form>
        <div className="section">
          <Grid container justify="space-between" direction="row" spacing={4}>
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-end"
              xs={8}
              spacing={1}
            >
              <Grid item xs={12} sm={3}>
                <div className=""></div>
              </Grid>
            </Grid>
            <Grid item container direction="row-reverse" xs={4}>
              <Grid item>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="available"
                    value={data.available}
                    onChange={addAvailiblityHandler}
                  />
                  <span className="slider round"></span>
                </label>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className="section">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignContent="center"
            spacing={3}
          >
            <Grid item xs={6} sm={4}>
              <input
                type="file"
                name="kitchen image"
                placeholder="Upload Picture*"
                accept="image/*"
                value={data.img}
                onChange={(event) => addDataHandler(event, "img")}
                required
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <input
                type="text"
                name="kitchen Name"
                placeholder="Kitchen Name*"
                required
                value={data["kitchen name"]}
                onChange={(event) => addDataHandler(event, "kitchen name")}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <input
                type="text"
                name="Owner"
                placeholder="Owner Name*"
                required
                value={data["Owner"]}
                onChange={(event) => addDataHandler(event, "Owner")}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <input
                type="text"
                name="address"
                placeholder="Address*"
                required
                value={data["address"]}
                onChange={(event) => addDataHandler(event, "address")}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <input
                type="number"
                name="Phone"
                placeholder="Phone/Mobile*"
                minLength="10"
                maxLength="10"
                required
                value={data["Phone"]}
                onChange={(event) => addDataHandler(event, "Phone")}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                value={data["email"]}
                onChange={(event) => addDataHandler(event, "email")}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <input
                type="number"
                name="FSSAI"
                placeholder="FSSAI Number*"
                minLength="14"
                maxLength="14"
                required
                value={data["FSSAI"]}
                onChange={(event) => addDataHandler(event, "FSSAI")}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <input
                type="number"
                name="prep time"
                placeholder="Preparation Time"
                value={data["prep time"]}
                onChange={(event) => addDataHandler(event, "prep time")}
              />
            </Grid>
          </Grid>
        </div>

        <div className="section">
          <div className="places-container">
            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              spacing={3}
            >
              {checkboxes}
            </Grid>
          </div>
        </div>

        <div className="section">
          <OrderTimeTable
            data={data.Order}
            changeOrderTime={addOrderTimeHandler}
          />
        </div>

        <div className="section">
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Button
                variant="contained"
                className={[classes.saveBtn, classes.button].join(" ")}
                type="submit"
              >
                Save
              </Button>
            </Grid>
            <Grid item>
              <Link to={"/admin/kitchen"}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Cancel
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
}

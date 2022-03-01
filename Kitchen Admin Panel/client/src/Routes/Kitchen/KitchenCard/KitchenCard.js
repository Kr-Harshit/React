import React from "react";
import * as Favicons from "react-icons/fa";
import * as Bsicons from "react-icons/bs";
import { Grid, makeStyles } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

import "./KitchenCard.css";

const useStyle = makeStyles({
  container: {
    border: "2px solid rgba(204, 204, 204, 0.76)",
    width: "100%",
    minHeight: "5rem",
  },
});

export default function KitchenCard(props) {
  let match = useRouteMatch();
  const stars = [];
  const classes = useStyle();

  for (let i = 0; i < 5; i++) {
    if (i < props.rating)
      stars.push(
        <Grid item key={i}>
          <Bsicons.BsFillStarFill className="star checked" />
        </Grid>
      );
    else
      stars.push(
        <Grid item key={i}>
          <Bsicons.BsFillStarFill className="star" />
        </Grid>
      );
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={2}
      className={classes.container}
    >
      <Grid item xs={12} sm={11} lg={11}>
        <Link
          to={`${match.url}/${props._id}`}
          style={{ textDecoration: "none" }}
        >
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={3} sm={2} lg={1}>
              <div className="card_content">{props.id}</div>
            </Grid>
            <Grid item xs={3} sm={2} lg={1}>
              <div className="card_content">{props.name}</div>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
              xs={3}
              sm={2}
              lg={1}
            >
              <Grid item>
                <Favicons.FaMapMarkerAlt className="icon" />
              </Grid>
              <Grid item>
                <div className="card_content">{props.address}</div>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="center"
              spacing={1}
              alignItems="center"
              xs={3}
              sm={2}
              lg={2}
            >
              {stars}
            </Grid>
            <Grid item xs={3} sm={2} lg={1}>
              <div className="card_content">{props.email}</div>
            </Grid>
            <Grid item xs={3} sm={2} lg={1}>
              {" "}
              <div className="card_content">{props.contact}</div>
            </Grid>
            <Grid item xs={3} sm={2} lg={1}>
              <div className="card_content">Rs. {props.price}</div>
            </Grid>
          </Grid>
        </Link>
      </Grid>

      <Grid item container justify="flex-end" xs={4} sm={1} lg={1}>
        <label className="switch">
          <input
            type="checkbox"
            checked={props.available}
            onChange={() => props.setAvailablity(props.id)}
          />
          <span className="slider round"></span>
        </label>
      </Grid>
    </Grid>
  );
}

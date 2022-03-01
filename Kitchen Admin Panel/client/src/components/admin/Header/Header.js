import { Grid, Avatar, makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import "./Header.css";

const useStyle = makeStyles({
  header: {
    borderBottom: "2px solid rgba(204, 204, 204, 0.76)",
    padding: "2rem ",
  },
  icon: {
    margin: "auto 0.5rem",
    marginBottom: "0.5rem",
  },
  Avatar: {
    transform: "scale(1.5)",
  },
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Header(active) {
  const classes = useStyle();
  const location = useLocation();
  const address = location.pathname.split("/");

  const headerAddress = address.map((itm, index) => {
    if (itm !== "") {
      if (index < address.length - 1)
        return (
          <div key={index} className="header-address">
            <h1>{capitalizeFirstLetter(itm)} </h1>
            <ArrowForwardIosIcon className={classes.icon} />
          </div>
        );
      else
        return (
          <div key={index} className="header-address">
            <h1>{capitalizeFirstLetter(itm)}</h1>
          </div>
        );
    } else return null;
  });

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.header}
    >
      <Grid item xs={9}>
        <div className="header_path">{headerAddress}</div>
      </Grid>
      <Grid
        item
        container
        justify="flex-end"
        alignItems="center"
        spacing={2}
        xs={3}
      >
        <Grid item>
          <p>Username</p>
        </Grid>
        <Grid item>
          <Avatar src="/broken-image.jpg" className={classes.Avatar} />
        </Grid>
      </Grid>
    </Grid>
  );
}

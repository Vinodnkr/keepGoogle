import { Grid, Typography, Link } from "@mui/material";
import React from "react";

const NotFoundPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Typography variant="h2">Not Found <br /> Error: 404</Typography>
      </Grid>
      <Grid item>
        <Typography>
          <Link variant="h3" href="/">Home</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;

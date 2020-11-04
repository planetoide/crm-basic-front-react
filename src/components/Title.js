import React from "react";
import Typography from "@material-ui/core/Typography";

function Title(props) {
  return (
    <div>
      <Typography component="h2" variant="h6" color="secondary" gutterBottom>
        {props.children}
      </Typography>
    </div>
  );
}

export default Title;

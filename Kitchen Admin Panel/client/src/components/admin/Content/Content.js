import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Kitchen from "../../../Routes/Kitchen/Kitchen";
import NoMatch from "../../nomatch/index";

export default function Content() {
  let match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/kitchen`} exact component={Kitchen} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

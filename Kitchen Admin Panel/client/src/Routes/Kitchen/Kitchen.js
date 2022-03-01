import React, { useState } from "react";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";

import KitchenList from "./KitchenList";
import ViewKitchen from "./ViewKitchen";
import AddKitchen from "./AddKitchen";

export default function Kitchen() {
  let match = useRouteMatch();
  const [selectedKitchen, setSelelctedKitchen] = useState("");
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path={`${match.url}/new-kitchen`}>
            <AddKitchen />
          </Route>
          <Route path={`${match.url}/:handle`}>
            <ViewKitchen data={selectedKitchen} />
          </Route>
          <Route path={`${match.url}`}>
            <KitchenList selectKitchen={setSelelctedKitchen} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

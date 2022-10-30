import React from "react";
import {Home} from "@/pages/Home";
import {Route} from "react-router-dom";
import {Alpha} from "@/pages/Alpha";
import {Burn} from "@/pages/Burn";
import {Category} from "@/pages/Category";
import {Config} from "@/pages/Config";
import {Detail} from "@/pages/Detail";
import {Settings} from "@/pages/Settings";
import {Tasks} from "@/pages/Tasks";
import {Update} from "@/pages/Update";
import {Search} from "@/pages/Search";

const routerList: {
  [path: string]: JSX.Element;
} = {
  "": <Home />,
  "produce/burn": <Burn />,
  "produce/update": <Update />,
  "produce/alpha": <Alpha />,
  "plugin/detail/:category/:fullName": <Detail />,
  config: <Config />,
  "plugin/category/:category": <Category />,
  tasks: <Tasks />,
  settings: <Settings />,
  "search/:query": <Search />,
};

export function getRouterNodes() {
  const nodes: JSX.Element[] = [];
  for (const path in routerList) {
    nodes.push(
      <Route key={path} path={"/" + path} element={routerList[path]} />
    );
  }
  return nodes;
}

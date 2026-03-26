import { Switch, Route, Router as WouterRouter } from "wouter";
import Demo from "@/pages/Demo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Demo} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

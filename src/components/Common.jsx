import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from "@material-ui/core";
// import { useCommonStyles } from "../styles/styles";
import Cards from "./Cards";
import NavBar from "./NavBar";
import Person from "./PersonCard";

export default function CommonPage() {
  // const classes = useCommonStyles();
  return (
    <>
      <CssBaseline />;
      <Container maxWidth="lg">
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Cards} />
            <Route path="/character/:id" component={Person} />
          </Switch>
        </Router>
      </Container>
    </>
  );
}

import * as React from "react";
import "./styles.css";
import styled from "styled-components";
import {
  HashRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Examples } from "./examples";
import { Creator } from "./creator";
import { Colors } from "./components/stylesheet";

export default function App() {
  return (
    <Router>
      <Content>
        <Navigation>
          <h1>Grid system overview</h1>
          <ul>
            <li>
              <NavLink to="/examples" activeClass="active">
                Examples
              </NavLink>
            </li>
            <li>
              <NavLink to="/creator" activeClass="active">
                Creator
              </NavLink>
            </li>
          </ul>
        </Navigation>

        <Main>
          <Switch>
            <Route path="/creator" component={Creator} />
            <Route path="/examples" component={Examples} />
            <Redirect to="/examples" />
          </Switch>
        </Main>
      </Content>
    </Router>
  );
}

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Navigation = styled.nav`
  padding: 8px;
  display: flex;
  flex-wrap: wrap;

  h1 {
    width: 100%;
    font-size: 32px;
    margin-bottom: 16px;
  }
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    padding-left: 16px;
  }

  a {
    border-radius: 4px;
    color: white;
    border: none;
    padding: 8px 16px;
    background-color: ${Colors.blue};
    color: white;
    text-decoration: none;
  }
  a.active {
    background-color: ${Colors.steelBlue};
  }
  li + li {
    margin-left: 20px;
  }
`;

const Main = styled.main`
  flex-grow: 1;
  background-color: #eaeaea;
  margin: 24px;
  margin-top: 8px;
  padding: 16px;
`;

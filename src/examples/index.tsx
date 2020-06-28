import React, { JSXElementConstructor } from "react";
import {
  RouteComponentProps,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import styled from "styled-components";
import { Bootstrapy } from "./Bootstrapy";
enum ExampleType {
  BOOTSTRAPY = "bootstrap-like",
  AREAS = "areas"
}

const ExampleTypeToExample: Record<ExampleType, JSXElementConstructor<any>> = {
  [ExampleType.BOOTSTRAPY]: Bootstrapy,
  [ExampleType.AREAS]: () => <div>Areas</div>
};

export type ExamplesProps = Pick<RouteComponentProps, "history" | "match">;

export const Examples = ({ match, history }: ExamplesProps) => {
  const createPath = (id: string) => {
    return `${match.path}${id}`;
  };
  return (
    <StyledExamples>
      <ul>
        {Object.values(ExampleType).map(id => (
          <li key={id}>
            <ExampleLink id={id} to={createPath(id)} />
          </li>
        ))}
      </ul>
      <Switch>
        {Object.values(ExampleType).map(type => (
          <Route
            path={`${match.path}${type}`}
            component={ExampleTypeToExample[type]}
          />
        ))}
        <Redirect to={`${match.path}${ExampleType.BOOTSTRAPY}`} />
      </Switch>
    </StyledExamples>
  );
};

const StyledExamples = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    padding: 0;
    margin: 0;
    margin-bottom: 16px;
    list-style: none;
    display: flex;
  }
  li + li {
    margin-left: 16px;
  }
`;

const ExampleLink = ({ id, to }: { id: string; to: string }) => {
  return <Link to={to}>{id}</Link>;
};

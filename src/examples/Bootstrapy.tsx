import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import {
  Title,
  Description,
  Grid,
  Cell as CellStyles
} from "../components/stylesheet";

export const Bootstrapy = () => {
  const [columnNumber, setColumnNumber] = useState(12);
  const [span, setSpan] = useState([3, 4, 5]);

  const handleSpan = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newSpan = [...span];
    if (!isNaN(Number(e.target.value))) {
      newSpan[index] = Number(e.target.value);
    }
    setSpan(newSpan);
  };

  return (
    <StyledContent>
      <h4>Standard layout</h4>
      <p>
        We can easily achieve <b>equal</b> spreading content between{" "}
        <Input
          value={columnNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setColumnNumber(Number(e.target.value))
          }
        />{" "}
        columns
      </p>
      <Standard column={columnNumber}>
        {Array.from({ length: 24 }, (_, index) => (
          <Cell key={index}>{index + 1}</Cell>
        ))}
      </Standard>
      <p>with spaning between columns</p>
      <Standard column={columnNumber}>
        <Cell span={span[0]}>
          Span
          <Input value={span[0]} onChange={handleSpan(0)} />
        </Cell>
        <Cell span={span[1]}>
          Span
          <Input value={span[1]} onChange={handleSpan(1)} />
        </Cell>
        <Cell span={span[2]}>
          Span
          <Input value={span[2]} onChange={handleSpan(2)} />
        </Cell>
      </Standard>
    </StyledContent>
  );
};
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    ${Title}
  }
  p {
    ${Description}
  }
`;

const Input = styled.input.attrs((props: {}) => ({ type: "number" }))`
  width: 30px;
`;

const Standard = styled.div<{ column: number }>`
  ${Grid};
  grid-template-columns: repeat(
    ${props => (isNaN(props.column) ? 12 : props.column)},
    1fr
  );
  gap: 12px;
`;

const Cell = styled.div<{ span: number }>`
  ${CellStyles}
  ${props => props.span && `grid-column: span ${props.span}`};
`;

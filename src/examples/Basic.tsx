import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import {
  Title,
  Description,
  Grid,
  Remark,
  Cell as CellStyles
} from "../components/stylesheet";
import { Select } from "../components/Select";

const NUMBER_OF_EXAMPLES = 4;
const ALIGN_ITEMS_OPTIONS = ["stretch", "flex-start", "center", "flex-end"];
export const Basic = () => {
  const [columnNumber, setColumnNumber] = useState(12);
  const [columnGap, setColumnGap] = useState(6);
  const [rowGap, setRowGap] = useState(24);
  const [span, setSpans] = useState(
    Array.from(
      { length: NUMBER_OF_EXAMPLES },
      () => Math.floor(Math.random() * 4) + 2
    )
  );
  const [columnStarts, setColumnStarts] = useState(
    Array.from(
      { length: NUMBER_OF_EXAMPLES },
      () => Math.floor(Math.random() * 4) + 1
    )
  );
  const [alignOption, setAlignOption] = useState(ALIGN_ITEMS_OPTIONS[0]);
  const [justifyOption, setJustifyOption] = useState(ALIGN_ITEMS_OPTIONS[0]);

  const handleChangeSpan = (index: number) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!isNaN(Number(e.target.value))) {
      const newSpan = [...span];

      newSpan[index] = Number(e.target.value);

      setSpans(newSpan);
    }
  };

  const handleChangeColumnStart = (index: number) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!isNaN(Number(e.target.value))) {
      const newColumnStart = [...columnStarts];
      newColumnStart[index] =
        Number(e.target.value) > columnNumber - 1
          ? 1
          : Number(e.target.value) < 1
          ? columnNumber - 1
          : Number(e.target.value);
      setColumnStarts(newColumnStart);
    }
  };

  return (
    <StyledContent>
      <h4>Standard layout</h4>
      <p>
        We can easily achieve <b>equal</b> spread of the content between{" "}
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
        {Array.from({ length: NUMBER_OF_EXAMPLES }, (_, index) => (
          <Cell key={index} span={span[index]}>
            Span
            <Input value={span[index]} onChange={handleChangeSpan(index)} />
          </Cell>
        ))}
      </Standard>
      <p>or with specific starting point.</p>
      <Standard column={columnNumber}>
        {Array.from({ length: NUMBER_OF_EXAMPLES }, (_, index) => (
          <Cell key={index} columnStart={columnStarts[index]}>
            Starts at
            <Input
              value={columnStarts[index]}
              onChange={handleChangeColumnStart(index)}
            />
          </Cell>
        ))}
      </Standard>
      <p>
        You can also adjust column gap{" "}
        <Input
          value={columnGap}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setColumnGap(Number(e.target.value))
          }
        />
        px and row gap{" "}
        <Input
          value={rowGap}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRowGap(Number(e.target.value))
          }
        />{" "}
        px. It could be expressed in %, rem, vh or vw too, however no combined
        option. For example you <b>cannot</b> have rule like "take 3%, but no
        more than 30px".
      </p>
      <Standard column={columnNumber} rowGap={rowGap} columnGap={columnGap}>
        {Array.from({ length: 24 }, (_, index) => (
          <Cell key={index}>{index + 1}</Cell>
        ))}
      </Standard>
      <h4>Remarks</h4>
      <p>
        For the layout that you see above there are couple of&nbsp;
        <b>defaults</b>.
      </p>
      <div className="remark">
        Size of the rows is based on the content with stretching for remaining
        elements
      </div>
      <p>
        It means that by default the content dictates minimal row height. You
        can for example adjust behaviour of other components{" "}
        <Select options={ALIGN_ITEMS_OPTIONS} onChange={setAlignOption} />.
        Dynamic sizing will be shown later.
      </p>
      <Standard column={columnNumber} alignItems={alignOption}>
        {Array.from({ length: 24 }, (_, index) => (
          <Cell key={index}>
            {index === 4
              ? "Long text in one cell will stretch the whole row"
              : index + 1}
          </Cell>
        ))}
      </Standard>
      <div className="remark">
        Size of column cannot be smaller than the content inside
      </div>
      <p>
        It means that by default the content dictates minimal column width. As
        you can see without adding any restrictions, it will break the whole
        purpose of this layout. More info about that later. You can again adjust
        how smaller content behaves{" "}
        <Select options={ALIGN_ITEMS_OPTIONS} onChange={setJustifyOption} />.
        Here is also a good moment to check grid behaves when content cannot fit
        the specified area - try for example big number of columns, so elements
        won't fit){" "}
        <Input
          value={columnNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setColumnNumber(Number(e.target.value))
          }
        />
        .
      </p>
      <Standard column={columnNumber} justifyItems={justifyOption}>
        {Array.from({ length: 48 }, (_, index) => (
          <Cell
            key={index}
            style={{ width: index === 4 ? "200px" : "inherit" }}
          >
            {index === 4 ? "This element has 200px" : index + 1}
          </Cell>
        ))}
      </Standard>
      <div className="remark">
        There is no change of a behaviour for different breakpoints, but can be
        added.
      </div>
      <div className="remark">
        All of the options that you see above can be applied to vertical layout
        too.
      </div>
      <p>
        You can combine that approach with horizontal. It means that you can
        think about the layout in two dimensions. More about it later.
      </p>
    </StyledContent>
  );
};
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    ${Title}
  }
  .remark {
    ${Remark}
  }
  p {
    ${Description}
  }
`;

const Input = styled.input.attrs((props: {}) => ({ type: "number" }))`
  width: 30px;
`;

const Standard = styled.div<{
  column: number;
  columnGap: number;
  rowGap: number;
  alignItems: string;
  justifyItems: string;
}>`
  ${Grid};
  grid-template-columns: repeat(
    ${props => (isNaN(props.column) ? 12 : props.column)},
    1fr
  );
  gap: ${props => `${props.rowGap || 12}px ${props.columnGap || 12}px`};
  align-items: ${props => props.alignItems || "stretch"};
  justify-items: ${props => props.justifyItems || "stretch"};
`;

const Cell = styled.div<{ span: number; columnStart: number }>`
  ${CellStyles}
  ${props => props.span && `grid-column: span ${props.span}`};
  ${props => props.columnStart && `grid-column: ${props.columnStart}/ span 2`};
`;

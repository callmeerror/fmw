import React from 'react';
import Wrapper from '../assets/wrappers/Table';

interface TableProps {
  fields: { title: string; key: string }[];
  data: { [key: string]: any }[];
  curSelect?: number;
  setCurSelect: (curSelect: number) => void;
  setCurByDoubleClick: (curSelect: number) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  fields,
  curSelect,
  setCurSelect,
  setCurByDoubleClick,
}) => {
  return (
    <Wrapper cellSpacing={0} cellPadding={0}>
      <thead>
        <tr>
          {fields.map((value, index) => {
            return index === fields.length - 1 || index === 0 ? (
              <th key={index} className='w160'>
                {value.title}
              </th>
            ) : (
              <th key={index}>{value.title}</th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          return (
            <tr
              onDoubleClick={() => setCurByDoubleClick(row.index)}
              key={rowIndex}
              onClick={() => setCurSelect(row.index)}
              className={curSelect === row.index ? 'activated' : undefined}
            >
              {fields.map((col, colIndex) => {
                return <td key={colIndex}>{row[col.key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Wrapper>
  );
};

export default Table;

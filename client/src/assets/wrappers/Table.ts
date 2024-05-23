import styled from 'styled-components';

const Wrapper = styled.table`
  user-select: none;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 6px;
  thead {
    text-transform: capitalize;
    background-color: #1d2323;
  }
  tbody {
    tr {
      cursor: pointer;
      background-color: #63686e;
      &:hover {
        background-color: #929aab;
      }
      td {
        padding: 6px 0px 6px 30px;
        color: var(--white);
      }
    }
  }
  th {
    padding: 6px 0px 6px 30px;
    text-align: left;
  }
  th:first-child {
    border-radius: 5px 0 0 5px;
  }

  th:last-child {
    border-radius: 0 5px 5px 0;
  }
  tr:first-child td:first-child {
    border-top-left-radius: 5px;
  }
  tr:first-child td:last-child {
    border-top-right-radius: 5px;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 5px;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 5px;
  }
  .w160 {
    width: 160px;
  }
  .activated {
    background-color: var(--primary-4) !important;
  }
`;

export default Wrapper;

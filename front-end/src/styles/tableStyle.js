import styled from 'styled-components';

const Table = styled.table`
  th {
    color: white;
    background-color: #A9A9A9;
    padding-right: 50px;
  }
  }
  tr:nth-child(even) {
    background-color: #C0C0C0;
  }
  tr:nth-child(odd) {
    background-color: #DCDCDC;
  }
  button {
    color: white;
    margin: 2px;
    width: 150px;
  }
  button:nth-child(even) {
    background-color: green;
  }
  button:nth-child(odd) {
    background-color: gold;
  }
`;

export default Table;

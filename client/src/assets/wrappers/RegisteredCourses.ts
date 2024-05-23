import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 40px;
  h1 {
    margin-bottom: 30px;
  }
  .courses-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
  }
`;

export default Wrapper;

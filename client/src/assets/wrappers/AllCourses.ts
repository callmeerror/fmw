import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 40px;
  .header {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      margin: 0;
    }
  }
  .courses-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
  }
`;

export default Wrapper;

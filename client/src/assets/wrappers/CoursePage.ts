import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 40px;
  .info {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
        margin: 0;
      }
      .btn-container {
        button {
          margin-left: 12px;
        }
      }
    }
    p {
      margin: 20px 0;
    }
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn-container {
      button {
        margin-left: 12px;
      }
    }
  }
  .sep {
    margin: 30px 0;
    height: 0;
    width: 100%;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgba(255, 255, 255, 0.3);
  }
  .what {
    margin: 10px 0;
    font-weight: bold;
  }
  .btn-danger {
    background-color: #dc143c;
    &:hover {
      background-color: #dc143c55;
    }
  }

  &>.btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    button {
      margin: 0 12px;
    }
  }
`;

export default Wrapper;

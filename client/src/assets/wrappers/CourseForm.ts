import styled from 'styled-components';

const Wrapper = styled.form`
  background-color: #31363f;
  border-radius: 20px;
  margin-top: 60px;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .form-container {
    width: 40vw;
    .for-what {
      margin: 0;
      text-align: center;
      font-size: 1.5rem;
      padding-bottom: 20px;
    }
    .form-row {
      margin: 20px 0;
      display: flex;
      flex-direction: row;
      & > label {
        width: 110px;
      }
      .input {
        flex-grow: 1;
        width: auto;
      }
      .ant-upload {
        width: 200px;
        height: 150px;
      }
    }
    .btn-container {
      display: flex;
      justify-content: space-around;
      .btn-cancel {
        background-color: #dc143c;
        &:hover {
          background-color: #dc143c55;
        }
      }
      width: 240px;
      margin: 50px auto 0;
    }
  }
`;

export default Wrapper;

import styled from 'styled-components';

const Wrapper = styled.div`
  div {
    cursor: pointer;
    overflow: hidden;
    aspect-ratio: 16/10;
    img {
      object-fit: cover;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      transition: opacity 0.3s;
      &:hover {
        opacity: 0.4;
      }
    }
  }
  p {
    font-weight: bold;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default Wrapper;

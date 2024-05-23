import styled from 'styled-components';

const Wrapper = styled.aside`
  display: flex;
  min-height: 100vh;
  height: 100%;
  width: 250px;
  min-width: 250px;
  margin-left: -250px;
  transition: 0.3s ease-in-out all;
  position: sticky;
  top: 0;
  background-color: var(--primary-1);
  z-index: 1235;
  align-items: center;
  box-shadow: 3px 0 10px 0 rgba(0, 0, 0, 0.3);
  .content {
    width: 100%;
  }
  &.show-sidebar {
    margin-left: 0;
  }
  .nav-link {
    display: flex;
    text-decoration: none;
    color: var(--textColor);
    align-items: center;
    font-size: 1.25rem;
    margin: 10px;
    border-radius: 6px;
    padding: 4px;
    .icon {
      width: 60px;
    }
    .text {
    }
    &:hover {
      background-color: var(--primary-2);
    }
  }
  .activated {
    background-color: var(--primary-2);
  }
`;

export default Wrapper;

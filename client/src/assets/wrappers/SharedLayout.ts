import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: var(--primary-3);
  color: var(--textColor);
  .dashboard {
    display: flex;
  }
  .dashboard-page {
    max-width: 90vw;
    margin: 0 auto;
  }
  .dashboard-main {
    position: relative;
    flex-grow: 1;
    margin-bottom: 50px;
  }
  .toggle-sidebar {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0 8px;
    z-index: 1236;
    .logo {
      height: 36px;
      margin: 0 140px 0 20px;
      cursor: pointer;
    }
    .toggle-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      padding: 8px;
      cursor: pointer;
      transition: 0.3s ease-in-out all;
    }
    .hide {
      width: 0;
      padding: 0;
    }
  }
`;

export default Wrapper;

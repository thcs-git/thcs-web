import styled from 'styled-components';

export const TabContent = styled.div`
  margin-bottom: 15px;
`;

export const TabNav = styled.div`
  background: var(--gray-light);
  box-shadow: 1px 1px 3px #00000029;

  display: flex;
  flex-direction: row;
`;

export const TabNavItem = styled.button`
  font-weight: bold;
  color: var(--gray-dark);

  padding: 20px;

  cursor: pointer;

  &.active {
    color: var(--secondary);
    border-bottom: 2px solid var(--secondary);
  }

  &:focus {
    outline: 0 !important;
  }
`;

export const TabBody = styled.div`
  background: var(--white);
  border-radius: 0px 0px 4px 4px;

  padding: 40px 15px 15px 15px;

  height: 65vh;

  overflow-x: hidden;
`;

export const TabBodyItem = styled.div`
  display: none;

  &.show {
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
  }
`;

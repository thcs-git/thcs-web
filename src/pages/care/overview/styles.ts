import styled from 'styled-components';
import { Container } from '@material-ui/core';

export const ContainerStyle = styled(Container)`
  .card-styles {
    min-height: 324px;
    position: relative;


  }

  .card-styles-footer {
    width: 60%;
    margin-left: -16%;
    margin-top: 16px;

    p:first-of-type {
      margin-top: 3px;
    }

    p {
      color: #CCCCCC !important;
      font-size: 10px;
    }

    img {
      padding: 0 10%;
    }
  }

  .btn-dropwdown {
    padding: 0 0 !important;

    span svg {
      margin: 0 !important;
    }
  }

  .text-list {
    padding: 10px 3% 0;

    li {
      padding-top: 0px;
      padding-bottom: 0px;
    }

    li svg {
      height: 14px;
      margin-right: 6px;
    }

    li p {
      font-size: 12px;
      margin-bottom: 2px;
    }
  }

  footer {
    position: absolute;
    bottom: 0;

    width: 100%;
    display: flex;
    justify-content: center;

    padding: 10px;

    span {
      font-size: 10px;
      color: rgb(0 0 0 / 32%) !important;
    }
  }

`;


export const Profile = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-left: 20px;
  }

  h5 {
    color: #333333;
  }
  p {
    color: #666666;
    font-size: 12px;
  }
`;

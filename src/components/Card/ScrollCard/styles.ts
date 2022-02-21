import styled from "styled-components";
import { Container } from "@material-ui/core";
import Glider from "react-glider";
import Box from "@material-ui/core/Box";
import "glider-js/glider.min.css";

export const Card = styled(Box)`
  width: 120px;
  height: 200px;
  background-color: var(--white);
  border: 1px solid #ebebeb;
  border-radius: 8px;
  margin: 15px 8px 0 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const IconCard = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const FooterCard = styled(Box)`
  background-color: var(--gray-light);
  width: 100%;
  border-radius: 0 0 8px 8px;
  color: #666666;
  text-align: center;
`;

export const GliderStyle = styled(Glider)`
  height: 130px;
  display: flex;
  flex-direction: row;
  gap: 16px;

  .glider-track {
    display: flex;
  }
`;

export const ContainerStyle = styled(Container)`
  width: 100%;
  height: 186px;
  background-color: var(--white);
  margin: 32px auto 8px;
  box-shadow: 0px 1px 4px #00000019;
  border-radius: 9px;

  .wrapperScroll {
    position: relative;

    .glider-next,
    .glider-prev {
      width: 125px;
      position: absolute;
      background: 0 0;
      z-index: 2;
      font-size: 80px;
      text-decoration: none;
      top: 0;
      cursor: pointer;
      color: #666;
      opacity: 1;
      line-height: 1;
      transition: opacity 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      color: var(--gray);
      height: 100%;
      cursor: pointer;
      backgroundcolor: #FFFFF;
      display: flex;
      justifycontent: center;
      alignitems: center;
    }

    .glider-dot,
    .glider-next,
    .glider-prev {
      border: 0;
      padding: 0;
      -webkit-user-select: none;
      user-select: none;
      outline: 0;
    }
    .glider-prev {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      svg {
        cursor: pointer;

        &:hover {
          color: var(--gray-dark);
        }
      }
    }
    .glider-prev.disabled {
      background: 0 0;
      color: var(--gray-light);
      opacity: 0;
      z-index: -1;
      svg {
        &:hover {
          color: var(--gray-light);
        }
      }
    }
    .glider-next {
      display: flex;
      justify-content: end;
      right: -21px;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 1) 100%
      );
      svg {
        cursor: pointer;

        &:hover {
          color: var(--gray-dark);
        }
      }
    }
    .glider-next.disabled {
      background: 0 0;
      color: var(--gray-light);
      opacity: 0;
      z-index: -1;

      svg {
        &:hover {
          color: var(--gray-light);
        }
      }
    }
  }
`;

import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import { Container, ContainerProps } from "@mui/material";
import Glider from "react-glider";
import Box, { BoxProps } from "@mui/material/Box";
import "glider-js/glider.min.css";
import theme from "../../../theme/theme";

export const Card = styledMui(Box)<BoxProps>(({ theme }) => ({
  // width: "120px",
  height: "200px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  margin: " 15px 8px 0 8px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  "& svg,  path": {
    cursor: "pointer",
  },
}));

export const IconCard = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  & path,
  circle {
    cursor: pointer;
  }
`;

export const FooterCard = styledMui(Box)<BoxProps>(({ theme }) => ({
  // backgroundColor: "var(--gray-light)",
  width: "100%",
  borderRadius: "0 0 8px 8px",
  textAlign: "center",
  cursor: "pointer",
}));

export const GliderStyle = styled(Glider)`
  height: 130px;
  display: flex;
  flex-direction: row;
  /* gap: 16px; */
  scrollbar-width: none;
  .glider-track {
    display: flex;
  }
`;

export const ContainerStyle = styled(Container)`
  width: calc(100% - 80px);
  /* width: auto; */
  height: 186px;
  background-color: white;
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
      z-index: 10;
      font-size: 80px;
      text-decoration: none;
      top: 2px;
      cursor: pointer;
      opacity: 1;
      line-height: 1;
      transition: all 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      color: ${theme.palette.grey[300]};
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        svg {
          fill: ${theme.palette.grey[500]};
          path {
            cursor: pointer;
          }
        }
      }
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
          color: ${theme.palette.grey[500]};
        }
      }
    }
    .glider-prev.disabled {
      background: 0 0;
      color: ${theme.palette.grey[300]};
      opacity: 0;
      z-index: -1;
      svg {
        &:hover {
          color: ${theme.palette.grey[300]};
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
          color: ${theme.palette.grey[300]};
        }
      }
    }
    .glider-next.disabled {
      background: 0 0;
      color: ${theme.palette.grey[200]};
      opacity: 0;
      z-index: -1;

      svg {
        &:hover {
          color: ${theme.palette.grey[300]};
        }
      }
    }
  }
`;

import styled from "styled-components";
import {Grid} from "@material-ui/core";

export const ButtonsContent = styled.div`
  position: relative;
  top: 250px;

  display: flex;
  justify-content: center;

  margin-bottom: 20px;

  & > button:not(:last-child) {
    margin-right: 10px;
  }
`;

export const ButtonsContent2 = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 20px;

  & > button:not(:last-child) {
    margin-right: 10px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  //padding: 200px;
  margin: 0 auto;
  position: relative;

  background-image: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 100, color-stop(0%, #374566), color-stop(100%, #010203));
  background-image: -webkit-radial-gradient(#374566, #010203);
  background-image: -moz-radial-gradient(#374566, #010203);
  background-image: -o-radial-gradient(#374566, #010203);
  background-image: radial-gradient(#374566, #010203);
`

export const H1 = styled.h1`
  position: relative;
  top: 200px;
  text-align: center;
  color: white;
  font-size: 3.5em;
`

export const Balloon = styled.div`
  width: 738px;
  margin: 0 auto;
  padding-top: 30px;
  position: relative;

  div {
    width: 104px;
    height: 140px;
    background: rgba(182, 15, 97, 0.9);
    border-radius: 0;
    border-radius: 80% 80% 80% 80%;
    margin: 0 auto;
    position: absolute;
    padding: 10px;
    box-shadow: inset 17px 7px 10px rgba(182, 15, 97, 0.9);
    -webkit-transform-origin: bottom center;
  }

  div:nth-child(1) {
    background: rgba(182, 15, 97, 0.9);
    left: 0;
    box-shadow: inset 10px 10px 10px rgba(135, 11, 72, 0.9);
    -webkit-animation: balloon1 6s ease-in-out infinite;
    -moz-animation: balloon1 6s ease-in-out infinite;
    -o-animation: balloon1 6s ease-in-out infinite;
    animation: balloon1 6s ease-in-out infinite;
  }

  div:nth-child(1):before {
    color: rgba(182, 15, 97, 0.9);
  }

  div:nth-child(2) {
    background: rgba(242, 112, 45, 0.9);
    left: 120px;
    box-shadow: inset 10px 10px 10px rgba(222, 85, 14, 0.9);
    -webkit-animation: balloon2 6s ease-in-out infinite;
    -moz-animation: balloon2 6s ease-in-out infinite;
    -o-animation: balloon2 6s ease-in-out infinite;
    animation: balloon2 6s ease-in-out infinite;
  }

  div:nth-child(2):before {
    color: rgba(242, 112, 45, 0.9);
  }

  div:nth-child(3) {
    background: rgba(45, 181, 167, 0.9);
    left: 240px;
    box-shadow: inset 10px 10px 10px rgba(35, 140, 129, 0.9);
    -webkit-animation: balloon4 6s ease-in-out infinite;
    -moz-animation: balloon4 6s ease-in-out infinite;
    -o-animation: balloon4 6s ease-in-out infinite;
    animation: balloon4 6s ease-in-out infinite;
  }

  div:nth-child(3):before {
    color: rgba(45, 181, 167, 0.9);
  }

  div:nth-child(4) {
    background: rgba(190, 61, 244, 0.9);
    left: 360px;
    box-shadow: inset 10px 10px 10px rgba(173, 14, 240, 0.9);
    -webkit-animation: balloon1 5s ease-in-out infinite;
    -moz-animation: balloon1 5s ease-in-out infinite;
    -o-animation: balloon1 5s ease-in-out infinite;
    animation: balloon1 5s ease-in-out infinite;
  }

  div:nth-child(4):before {
    color: rgba(190, 61, 244, 0.9);
  }

  div:nth-child(5) {
    background: rgba(180, 224, 67, 0.9);
    left: 480px;
    box-shadow: inset 10px 10px 10px rgba(158, 206, 34, 0.9);
    -webkit-animation: balloon3 5s ease-in-out infinite;
    -moz-animation: balloon3 5s ease-in-out infinite;
    -o-animation: balloon3 5s ease-in-out infinite;
    animation: balloon3 5s ease-in-out infinite;
  }

  div:nth-child(5):before {
    color: rgba(180, 224, 67, 0.9);
  }

  div:nth-child(6) {
    background: rgba(242, 194, 58, 0.9);
    left: 600px;
    box-shadow: inset 10px 10px 10px rgba(234, 177, 15, 0.9);
    -webkit-animation: balloon2 3s ease-in-out infinite;
    -moz-animation: balloon2 3s ease-in-out infinite;
    -o-animation: balloon2 3s ease-in-out infinite;
    animation: balloon2 3s ease-in-out infinite;
  }

  div:nth-child(6):before {
    color: rgba(242, 194, 58, 0.9);
  }

  div:before {
    color: rgba(182, 15, 97, 0.9);
    position: absolute;
    bottom: -11px;
    left: 52px;
    content: "▲";
    font-size: 1em;
  }

  h2 {
    font-size: 4.8em;
    color: white;
    position: relative;
    left: 50%;
    margin-left: -27px;
  }

  /*BALLOON 1 4*/
  @-webkit-keyframes balloon1 {
    0%, 100% {
      -webkit-transform: translateY(0) rotate(-6deg);
    }
    50% {
      -webkit-transform: translateY(-20px) rotate(8deg);
    }
  }
  @-moz-keyframes balloon1 {
    0%, 100% {
      -moz-transform: translateY(0) rotate(-6deg);
    }
    50% {
      -moz-transform: translateY(-20px) rotate(8deg);
    }
  }
  @-o-keyframes balloon1 {
    0%, 100% {
      -o-transform: translateY(0) rotate(-6deg);
    }
    50% {
      -o-transform: translateY(-20px) rotate(8deg);
    }
  }
  @keyframes balloon1 {
    0%, 100% {
      transform: translateY(0) rotate(-6deg);
    }
    50% {
      transform: translateY(-20px) rotate(8deg);
    }
  }
  /* BAllOON 2 5*/
  @-webkit-keyframes balloon2 {
    0%, 100% {
      -webkit-transform: translateY(0) rotate(6deg);
    }
    50% {
      -webkit-transform: translateY(-30px) rotate(-8deg);
    }
  }
  @-moz-keyframes balloon2 {
    0%, 100% {
      -moz-transform: translateY(0) rotate(6deg);
    }
    50% {
      -moz-transform: translateY(-30px) rotate(-8deg);
    }
  }
  @-o-keyframes balloon2 {
    0%, 100% {
      -o-transform: translateY(0) rotate(6deg);
    }
    50% {
      -o-transform: translateY(-30px) rotate(-8deg);
    }
  }
  @keyframes balloon2 {
    0%, 100% {
      transform: translateY(0) rotate(6deg);
    }
    50% {
      transform: translateY(-30px) rotate(-8deg);
    }
  }
  /* BAllOON 0*/
  @-webkit-keyframes balloon3 {
    0%, 100% {
      -webkit-transform: translate(0, -10px) rotate(6deg);
    }
    50% {
      -webkit-transform: translate(-20px, 30px) rotate(-8deg);
    }
  }
  @-moz-keyframes balloon3 {
    0%, 100% {
      -moz-transform: translate(0, -10px) rotate(6deg);
    }
    50% {
      -moz-transform: translate(-20px, 30px) rotate(-8deg);
    }
  }
  @-o-keyframes balloon3 {
    0%, 100% {
      -o-transform: translate(0, -10px) rotate(6deg);
    }
    50% {
      -o-transform: translate(-20px, 30px) rotate(-8deg);
    }
  }
  @keyframes balloon3 {
    0%, 100% {
      transform: translate(0, -10px) rotate(6deg);
    }
    50% {
      transform: translate(-20px, 30px) rotate(-8deg);
    }
  }
  /* BAllOON 3*/
  @-webkit-keyframes balloon4 {
    0%, 100% {
      -webkit-transform: translate(10px, -10px) rotate(-8deg);
    }
    50% {
      -webkit-transform: translate(-15px, 20px) rotate(10deg);
    }
  }
  @-moz-keyframes balloon4 {
    0%, 100% {
      -moz-transform: translate(10px, -10px) rotate(-8deg);
    }
    50% {
      -moz-transform: translate(-15px, 10px) rotate(10deg);
    }
  }
  @-o-keyframes balloon4 {
    0%, 100% {
      -o-transform: translate(10px, -10px) rotate(-8deg);
    }
    50% {
      -o-transform: translate(-15px, 10px) rotate(10deg);
    }
  }
  @keyframes balloon4 {
    0%, 100% {
      transform: translate(10px, -10px) rotate(-8deg);
    }
    50% {
      transform: translate(-15px, 10px) rotate(10deg);
    }
  }
`

export const WelcomeTextWrapper = styled.div`
  .wish {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 4%;
    width: 100%;
    text-align: center;
    font-size: 3em;
    color: red;
    letter-spacing: 0.1em;
    font-family: 'Pacifico', cursive;
    background: -webkit-linear-gradient(#ffff00, #ff1493);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: hue 3s infinite ease-in-out;
  }

  @-webkit-keyframes hue {
    0% {
      -webkit-filter: hue-rotate(0deg);
      transform: scale(1) rotate(0deg);
    }

    50% {
      -webkit-filter: hue-rotate(360deg);
      transform: scale(1.2) rotate(5deg);
    }
  }

  .cake {
    position: absolute;
    width: 250px;
    height: 200px;
    top: 50%;
    left: 50%;
    margin-top: -70px;
    margin-left: -125px;
  }

  .plate {
    position: absolute;
    width: 290px;
    height: 130px;
    bottom: -10px;
    left: -15px;
    background-color: #ccc;
    border-radius: 25%;
    box-shadow: 0 5px 0 0 #000;
  }

  .cake > * {
    position: absolute;
  }

  .layer {
    position: absolute;
    display: block;
    width: 250px;
    height: 100px;
    border-radius: 25%;
    background-color: #2a0a0a;
    border: 3px solid #fff;
    box-shadow: 0 15px 0 0 #2a0a0a,
    0 30px 0 0 #2a0a0a,
    0 33px 0 0 #fff,
    0 45px 0 0 #2a0a0a,
    0 60px 0 0 #2a0a0a,
    0 63px 0 0 #fff,
    0 75px 0 0 #2a0a0a,
    0 90px 0 0 #2a0a0a;
  }

  .icing {
    top: 3px;
    left: 3px;
    background-color: #fff;
    border: 5px dotted #2a0a0a;
    width: 240px;
    height: 90px;
    border-radius: 25%;
  }

  .name {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 10%;
    width: 100%;
    text-align: center;
    font-size: 1em;
    color: #2a0a0a;
    font-family: 'Pacifico', cursive;
  }

  .candle1 {
    z-index: 10;
    width: 10px;
    height: 50px;
    background-color: #fe2e2e;
    border-radius: 4px;
    top: -25px;
    left: 50%;
    margin-left: -8px;
  }

  .flame1 {
    border-bottom-left-radius: 45% 35%;
    border-bottom-right-radius: 45% 35%;
    box-shadow: 0 -15px 2px 2px #ffc205;
    background-color: yellow;
    border-radius: 50%;
    height: 30px;
    width: 5px;
    top: -30px;
    left: 30%;
    position: absolute;
  }

  .candle2 {
    z-index: 10;
    width: 10px;
    height: 50px;
    background-color: #fe2e2e;
    border-radius: 4px;
    top: -25px;
    left: 80%;
    margin-left: -8px;
  }

  .flame2 {
    border-bottom-left-radius: 45% 35%;
    border-bottom-right-radius: 45% 35%;
    box-shadow: 0 -15px 2px 2px #ffc205;
    background-color: yellow;
    border-radius: 50%;
    height: 30px;
    width: 5px;
    top: -30px;
    left: 30%;
    position: absolute;
  }

  .candle3 {
    z-index: 10;
    width: 10px;
    height: 50px;
    background-color: #fe2e2e;
    border-radius: 4px;
    top: -25px;
    left: 20%;
    margin-left: -8px;
  }

  .flame3 {
    border-bottom-left-radius: 45% 35%;
    border-bottom-right-radius: 45% 35%;
    box-shadow: 0 -15px 2px 2px #ffc205;
    background-color: yellow;
    border-radius: 50%;
    height: 30px;
    width: 5px;
    top: -30px;
    left: 30%;
    position: absolute;
  }

  .candle4 {
    z-index: 10;
    width: 10px;
    height: 50px;
    background-color: #fe2e2e;
    border-radius: 4px;
    top: 15px;
    left: 15%;
    margin-left: -8px;
  }

  .flame4 {
    border-bottom-left-radius: 45% 35%;
    border-bottom-right-radius: 45% 35%;
    box-shadow: 0 -15px 2px 2px #ffc205;
    background-color: yellow;
    border-radius: 50%;
    height: 30px;
    width: 5px;
    top: -30px;
    left: 30%;
    position: absolute;
  }

  .candle5 {
    z-index: 10;
    width: 10px;
    height: 50px;
    background-color: #fe2e2e;
    border-radius: 4px;
    top: 15px;
    left: 85%;
    margin-left: -8px;
  }

  .flame5 {
    border-bottom-left-radius: 45% 35%;
    border-bottom-right-radius: 45% 35%;
    box-shadow: 0 -15px 2px 2px #ffc205;
    background-color: yellow;
    border-radius: 50%;
    height: 30px;
    width: 5px;
    top: -30px;
    left: 30%;
    position: absolute;
  }

  .text {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 80%;
    width: 100%;
    text-align: center;
    font-size: 1em;
    color: white;
    font-family: 'Pacifico', cursive;
  }
`;

import styled from "styled-components";
import { Slider } from "@mui/material";

export const SliderComponent = styled(Slider)`
  span.MuiSlider-thumb,
  span.MuiSlider-rail,
  span.MuiSlider-mark,
  span.MuiSlider-track,
  span.MuiSlider-valueLabel > span {
    background: var(--secondary);
  }

  .MuiSlider-thumb.Mui-focusVisible,
  .MuiSlider-thumb:hover {
    box-shadow: 0px 0px 0px 8px var(--switch-hover);
  }
`;

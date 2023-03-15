import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../../theme/theme";
import { motion } from "framer-motion";

interface IStyles {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  border?: number
}

interface IStrengthPasswordMeter {
  password: string;
  styles?: IStyles;
}

export default function StrengthPasswordMeter({
  password,
  styles,
}: IStrengthPasswordMeter) {
  const [strength, setStrength] = useState<number>(0);

  const validationsRegex = [/[a-z]+/, /[A-Z]+/, /[0-9]+/, /[^a-zA-Z 0-9]+/];

  useEffect(() => {
    let strengthMeter = 0;
    validationsRegex.forEach((regex) => {
      if (password.match(regex)) {
        strengthMeter++;
      }
    });
    setStrength(strengthMeter);
  }, [password]);

  const handleColor = (strength) => {
    if (strength == 0) {
      return theme.palette.error.main;
    }
    if (strength == 1) {
      return theme.palette.error.light;
    }
    if (strength == 2) {
      return theme.palette.warning.main;
    }
    if (strength == 3) {
      return theme.palette.success.main;
    }
    if (strength == 4) {
      return theme.palette.success.dark;
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFF",
          minHeight: 4,
          mb: 0.5,
          borderRadius: 0.5,
          border: styles?.border ? styles?.border : 0,
          borderColor: styles?.borderColor ? styles?.borderColor : "#FFF",
        }}
      >
        <motion.div
          style={{
            width: 100 * strength,
            backgroundColor: handleColor(strength),
            minHeight: 4,
            borderRadius: 1.5,
            transitionDuration: "0.6s"
          }}/>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} mr={1}>
        <Typography
          sx={{ color: styles?.color ? styles?.color : "#FFF", fontSize: 12 }}
        >
          {strength == 0 && "Muito fraca"}
          {strength == 1 && "Fraca"}
          {strength == 2 && "Boa"}
          {strength == 3 && "Forte"}
          {strength == 4 && "Muito forte"}
        </Typography>
      </Box>
    </>
  );
}

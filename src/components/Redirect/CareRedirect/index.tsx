/**
 * REACT
 */
import React from "react";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

/**
 * STYLE
 */
import theme from "../../../theme/theme";

/**
 * ICONS
 */
import AlertIcon from "../../Icons/Alert";

/**
 * Component For Display Info About Redirect
 * @constructor
 */
export default function CareRedirect() {
    return (
        <Container sx={{width: "100%", height: "100vh"}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100vh",
                    color: theme.palette.text.primary,
                }}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        fontWeight: "700",
                        fontSize: "1.5rem",
                    }}
                >
                    <Typography variant="h4" fontWeight={500} color="primary.main">
                        Aguarde, estamos redirecinando você até o prontuário do paciente
                    </Typography>

                    <AlertIcon
                        fill={theme.palette.primary.main}
                        width={"3rem"}
                        height={"3rem"}
                    />
                </Box>
            </Box>
        </Container>
    )
}
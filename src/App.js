import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";

import AppRoutes from "./App.routes";

const theme = createTheme({
  palette: {
    primary: {
      light: "#7E6CCA",
      main: "#6F5CC4",
      dark: "#504190",
    },
    background: {
      paper: "#F7F7F7",
    },
  },
});

const AppContainer = styled("div")(
  ({ theme }) => `
  height: 100vh;
  background-color: ${theme.palette.background.paper};
`
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

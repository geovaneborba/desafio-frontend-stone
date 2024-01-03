import "./lib/dayjs";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/default";
import { GlobalStyles } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/Router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

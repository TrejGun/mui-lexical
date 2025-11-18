import type { Decorator, Preview } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline, StyledEngineProvider } from "@mui/material";
import { CacheProvider, Global } from "@emotion/react";
import createCache from "@emotion/cache";

import { muiLexicalStyles } from "../src";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const theme = createTheme();

const withMuiTheme: Decorator = Story => {
  return (
    <CacheProvider value={muiCache}>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Global styles={muiLexicalStyles} />
          <div style={{ padding: "20px", minHeight: "100vh" }}>
            <Story />
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
  },
  decorators: [withMuiTheme],
};

export default preview;

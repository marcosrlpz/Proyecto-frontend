import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: dark;
  }

  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    background: radial-gradient(1200px 600px at 20% 10%, rgba(37,99,235,.18), transparent 60%),
                radial-gradient(900px 500px at 80% 0%, rgba(16,185,129,.10), transparent 55%),
                rgba(2,6,23,1);
    color: #e5e7eb;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font: inherit;
  }
`;

export default GlobalStyles;

import { createTheme } from "@mui/material";

// Create a custom theme
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#008DF1",
      light: "#F0F6FE",
    },
    secondary: {
      main: "#008DF1",
    },

    grey: {
      900: "#1F1F1F",
    },
    error: {
      light: "#DE4437",
      main: "#DE4437",
    },
  },

  typography: {
    fontFamily: "Roboto",
    h1: {
      fontSize: "60px",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (min-width:1536px)": {
        fontSize: "80px", // Adjust font size for screens wider than 600px
      },
    },
    h3: {
      fontSize: "40px",
      fontWeight: 700,
    },
    h6: {
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "14.184px",
    },
    subtitle1: {
      fontSize: "24px",
      lineHeight: 1.875,
    },
    subtitle2: {
      fontSize: "16px",
      lineHeight: "22.72px",
      fontWeight: 400,
    },
    caption: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "14.184px",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          boxShadow: "0rem .125rem .25rem 0rem rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            ".MuiInputBase-root ": {
              borderRadius: ".5rem",
            },
            ".MuiInputBase-input": {
              height: "3rem",
              boxSizing: "border-box",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#D0D5DD",
            },
            ".MuiInputBase-sizeSmall": {
              height: "2.25rem",
            },
          },
        },
        {
          props: { variant: "filled" },
          style: {
            ".MuiInputBase-root ": {
              borderRadius: ".5rem",
              border: "1px solid #D0D5DD",
              "&:before": {
                borderBottom: "none",
              },
            },
            ".MuiInputBase-input": {
              height: "3rem",
              boxSizing: "border-box",
            },
          },
        },
        {
          props: { size: "small" },
          style: {
            ".MuiInputBase-input": {
              height: "36px",
              "&:hover": {
                "&:before": {
                  borderBottom: "none",
                },
              },
              "&:focus": {
                "&::after": {
                  borderBottom: "none",
                  display: "none",
                },
              },
            },
          },
        },
      ],
    },

    MuiSelect: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            textTransform: "initial",
            "& .MuiInputBase-root ": {
              borderRadius: "4px",
            },
            ".MuiInputBase-input": {
              height: "36px",
              boxSizing: "border-box",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#D0D5DD",
            },
          },
        },
      ],
    },

    MuiCheckbox: {},
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "3rem",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled.MuiButton-containedPrimary": {
            color: "White",
            backgroundColor: "#83CAFD",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            color: "white",
            backgroundColor: "primary.main",
            borderRadius: "8",
            fontStyle: "normal",
            boxShadow: "none",
            textTransform: "initial",
            fontWeight: 500,
            lineHeight: "1.5rem",
          },
        },

        {
          props: { variant: "text" },
          style: { textTransform: "initial" },
        },
        {
          props: { size: "large" },
          style: {
            // height: "3rem",
          },
        },
        {
          props: { size: "small" },
          style: {
            // height: "2rem",
          },
        },
      ],
    },

    MuiMenu: {
      variants: [
        {
          props: { variant: "menu" },
          style: {
            ".MuiPaper-root": {
              border: ".0625rem solid #D9DDE7",
              color: "#000",
              boxShadow: "0rem 2px .25rem 0rem rgba(0, 0, 0, 0.10)",
              borderRadius: ".3125rem",
              padding: ".625rem",
            },
            ".MuiMenu-list": {
              padding: "0",
            },
            ".MuiMenuItem-root": {
              padding: "0",
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: ".3125rem",
            borderColor: "#D9DDE7",
            textTransform: "initial",
          },
        },
      ],
    },

    MuiTable: {
      styleOverrides: {
        root: {
          ".MuiTableSortLabel-icon": {
            opacity: 1,
            color: "#797878",
          },
        },
      },
    },
  },
});

export default theme;

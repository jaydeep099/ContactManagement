import { extendTheme } from "@mui/material/styles";
import { createSvgIcon } from "@mui/material/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";


const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

export const Navigation = [
  {
    kind: "header",
  },
  {
    segment: "signin",
    title: "SignIn",
    icon: <PlusIcon />,
  },
  {
    segment: "signup",
    title: "Signup",
    icon: <PlusIcon />,
  },
  {
    segment: "create",
    title: "Create",
    icon: <PlusIcon />,
  },
  {
    segment: "update",
    title: "Update",
    icon: <ArrowUpwardIcon />,
  },
  {
    segment: "delete",
    title: "Delete",
    icon: <DeleteIcon />,
  },
];

export const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


import { Checkbox, FormControlLabel, styled } from "@mui/material";
import { checkSVG } from "~/assets";

interface Props {
  label?: string;
  checked?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom" | undefined;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 6,
  width: 23,
  height: 23,
  backgroundColor: "var(--font-color)",
  position: "relative",
  "input:disabled ~ &": {
    boxShadow: "none",
    opacity: 0.5,
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--font-color)",
  backgroundImage: "none",
  position: "relative",
  "&:before": {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 10,
    height: 10,
    background: `url(${checkSVG}) no-repeat center center`,
    filter: "invert(0%) sepia(8%) saturate(2153%) hue-rotate(358deg) brightness(10%) contrast(86%)",
    content: '""',
  },
});

export function CheckboxBtn({ label, checked, onClick, labelPlacement }: Props) {
  return (
    <FormControlLabel
      label={label}
      labelPlacement={labelPlacement}
      sx={{ color: "var(--font-color)", fontSize: 24, fontWeight: 600 }}
      control={
        <Checkbox
          checkedIcon={<BpCheckedIcon />}
          icon={<BpIcon />}
          checked={checked}
          onChange={onClick}
        />
      }
    />
  );
}

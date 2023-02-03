import { settingsSVG } from "~/assets";
import classes from "./SettingsBtn.module.scss";

interface Props {
  onClick?: () => void;
}

export function SettingsBtn({ onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className={classes.btn}>
      <img src={settingsSVG} alt="" />
    </button>
  );
}

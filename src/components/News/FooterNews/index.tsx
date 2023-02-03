import { useEffect } from "react";
import { useNews } from "../context/NewsContext";
import classes from "./FooterNews.module.scss";

export function FooterNews() {
  const { isLoading, news, setFetchToggle } = useNews();

  useEffect(() => {
    setFetchToggle(true);
  }, []);

  return <div className={classes.footer}>{isLoading ? <h4>Loading...</h4> : <p>{news}</p>}</div>;
}

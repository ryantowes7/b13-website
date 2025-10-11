import { useEffect, useState } from "react";

export default function SiteLogo({ ...props }) {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    fetch("/content/settings/site.json")
      .then(res => res.json())
      .then(cfg => setLogo(cfg.logo));
  }, []);

  if (!logo) return null;
  return <img src={logo} alt="Logo" {...props} />;
}
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { isEnvBrowser } from "./utils/misc";
import { fetchNui } from "./utils/fetchNui";
import * as exports from "./utils/exports";
import "./App.css";

const resourceName = "react-ts-app-template";

const { getSettings } = exports;

const App = () => {
  const [theme, setTheme] = useState("light");
  const [nuiData, setNuiData] = useState("");
  const appDiv = useRef(null);

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    document.getElementsByTagName("body")[0].style.visibility = "visible";

    if (!isEnvBrowser()) {
      getSettings().then((settings) => {
        setTheme(settings.theme);
      });

      fetchNui("get-nui-data", null, resourceName).then((data: string) =>
        setNuiData(data)
      );
    }
  }, []);

  return (
    <AppProvider>
      <div className="app" ref={appDiv} data-theme={theme}>
        <div className="app-wrapper">
          <div className="header">
            <div className="title">Custom App Template</div>
            <div className="subtitle">React TS</div>
            <div className="subtitle">{nuiData}</div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (isEnvBrowser()) {
    return <div className="browser-wrapper">{children}</div>;
  } else return children;
};

export default App;

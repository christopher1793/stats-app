import React, { ReactNode, useEffect, useRef, useState } from "react";
import { isEnvBrowser } from "./utils/misc";
import { fetchNui } from "./utils/fetchNui";
import * as exports from "./utils/exports";
import Card from './components/Card'
import Experience from "./types/Experience";
import "./App.css";

const resourceName = "react-ts-app-template";

const { getSettings } = exports;

const App = () => {
  const [theme, setTheme] = useState("light");
  const [playerName, setPlayerName] = useState("Player Name");
  const [nuiData, setNuiData] = useState("");
  const appDiv = useRef(null);
  const experience: Experience = [
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    },
    {
      label: 'Strength',
      value: 500,
      max: 1000
    }
  ]

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
      fetchNui("prp_experience:setData", null, resourceName).then((data: any) =>
        setPlayerName(data.name)
      );
    }
  }, []);

  return (
    <AppProvider>
      <div className="app" ref={appDiv} data-theme={theme}>
        <div className="app-wrapper">
          <div 
            className="h-[15%] w-full flex flex-col justify-center items-center text-[#C9CFDB] bg-[#0B0D0E]"
            style={{
              borderBottom: '4px solid',
              borderImage: 'linear-gradient(90deg, hsla(338, 22%, 7%, 1) 0%, hsla(200, 12%, 5%, 1) 9%, hsla(352, 70%, 40%, 1) 52%, hsla(200, 12%, 5%, 1) 96%)',
              borderImageSlice: 1,
            }}
          >
            <div className="text-2xl font-medium uppercase"> Reputation Points </div>
            <div className="text-md text-[#B12032] uppercase"> {playerName} </div>
          </div>
          <div className="flex flex-col h-[90%] w-[100%] items-center">
            {experience.map((e, index) => {
                return (
                  <Card key={'card-' + index} data={e}/>
                )
              })}
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

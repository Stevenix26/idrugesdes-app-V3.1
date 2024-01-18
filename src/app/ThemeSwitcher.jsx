// app/components/ThemeSwitcher.ts;
'use client'
// import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { Moon, SunDim, ComputerTower, FileSearch } from "@phosphor-icons/react/dist/ssr";
import {Box,IconButton,  InputBase,  useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { useContext } from "react";
import { ColorModeContext, tokens} from "./components/themes/theme";

function ThemeSwitcher() {
  // const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);


  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

  return (
    <div className="flex w-full flex-col">
     {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <FileSearch/>
        </IconButton>
      </Box>

    <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <SunDim />
          ) : (
            <Moon />
          )}
      </IconButton> */}
    <Tabs 
        onClick={colorMode.toggleColorMode}
        aria-label="Options" 
        color="warning" 
        size="sm"
        radius="full"
          classNames={{
          tabList: "gap-3 w-full",
          cursor: "w-full bg-[#e97732]",
          tab: "max-w-fit",
          tabContent: "group-data-[selected=true]:text-[#f4f4f5]"
        }}
    >
        {theme.palette.mode === "dark" ? (<Tab className="flex items-center space-x-2" key="photos" title={
          <div className="flex items-center space-x-2">
            <SunDim />
            <span>light</span>
          </div>
        } />) : (<Tab key="moon"
          title={
            <div className="flex items-center space-x-2">
              <Moon />
              <span>moon</span>
            </div>}
        />)} 
     
        {/* <Tab key="com"  title={
        <div className="flex items-center space-x-2">
          <ComputerTower className="text-indigo-300"/>
          <span>system</span>
        </div>}
      /> */}
    </Tabs>
          {/* <Tabs key='sm' color="warning" size="sm" aria-label="Tabs sizes">
          <Tab key="photos" title="Photos"/>
          <Tab key="music" title="Music"/>
          <Tab key="videos" title="Videos"/>
        </Tabs> */}

        {/* <Tabs key='md' color="warning" size="sm" aria-label="Tabs sizes">
            <Tab value="light" title={ 
            <SunIcon size={6} />}/>
        </Tabs> */}
    </div>
  );
}

export default ThemeSwitcher;



// app/components/ThemeSwitcher.ts;
// 'use client'
// import React from "react";
// import {Tabs, Tab} from "@nextui-org/react";

// function ThemeSwitcher() {
//   const colors = [
//     "warning",
    
//   ];

//   return (
//     <div className="flex flex-wrap gap-4">
//       {colors.map((color) => (
//         <Tabs key={color} color={color} aria-label="Tabs colors" radius="full">
          
//         </Tabs>
//       ))}
//     </div>
//   );
// }


// export default ThemeSwitcher;

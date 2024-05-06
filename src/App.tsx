import "react-native-gesture-handler";
import "react-native-get-random-values";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";

import ApplicationNavigator from "@/navigations/Application";
import { initSDK } from "@/utils/imCommon";
import dark from "@/theme/dark.json";
import light from "@/theme/light.json";
import "@/translations";
import { useUserStore } from "./store/user";

function App() {
  const [themeStatus] = useState(true);
  const theme = themeStatus ? light : dark;

  const getAppConfigByReq = useUserStore((state) => state.getAppConfigByReq);

  useEffect(() => {
    initSDK();
    getAppConfigByReq();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <RootSiblingParent>
        <ApplicationNavigator />
      </RootSiblingParent>
    </PaperProvider>
  );
}

export default App;

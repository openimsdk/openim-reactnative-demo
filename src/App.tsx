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

function App() {
  const [themeStatus] = useState(true);
  const theme = themeStatus ? light : dark;

  useEffect(() => {
    initSDK();
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

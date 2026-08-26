import "react-native-get-random-values";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { type ComponentProps, useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";

import ApplicationNavigator from "@/navigations/Application";
import { initSDK } from "@/utils/imCommon";
import dark from "@/theme/dark.json";
import light from "@/theme/light.json";
import "@/translations";

type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const paperSettings = {
  icon: ({ name, color, size }: { name: string; color?: string; size: number }) => (
    <MaterialCommunityIcons name={name as MaterialIconName} color={color} size={size} />
  ),
};

function App() {
  const [themeStatus] = useState(true);
  const theme = themeStatus ? light : dark;

  useEffect(() => {
    initSDK();
  }, []);

  return (
    <PaperProvider theme={theme} settings={paperSettings}>
      <RootSiblingParent>
        <ApplicationNavigator />
      </RootSiblingParent>
    </PaperProvider>
  );
}

export default App;

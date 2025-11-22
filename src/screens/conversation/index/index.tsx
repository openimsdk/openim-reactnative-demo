import SafeAreaWrap from "@/components/SafeAreaWrap";
import { styles } from "./styles";

import { ConversationContent, ConversationHeader } from "./components";

export default function ConversationScreen() {
  return (
    <SafeAreaWrap insets={['top', 'horizontal']} style={styles.container} safeAreaBgColor="#fff">
      <ConversationHeader />
      <ConversationContent />
    </SafeAreaWrap>
  );
}

import SafeAreaWrap from '@/components/SafeAreaWrap';
import { Image, StatusBar, Text, TouchableHighlight, View } from 'react-native';
import { styles } from './styles';
import { Cell, CellGroup } from '@/components/Cell';
import Avatar from '@/components/Avatar';
import { RootStackNavigationProp } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<RootStackNavigationProp>();

  function logout() {
    // TODO:
    console.log('logout');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
      <View style={[styles.topBg]}>
        <Image source={require('@/assets/images/profile/bg.png')} style={styles.topBgImage} />
      </View>

      <SafeAreaWrap insets={['horizontal']} style={styles.mainContent}>
        <View style={styles.userCard}>
          <Avatar fallback="K"/>
          <View style={styles.userCardContent}>
            <Text style={styles.userName}>John Doe</Text>
            <View style={styles.userIdContainer}>
              <Text style={styles.userId}>561885113</Text>
              <CopyIconButton onPress={() => {}} />
            </View>
          </View>
        </View>

        <CellGroup borderRadius={6}>
          <Cell onPress={() => navigation.navigate('SelfInfo')} link>
            <View style={styles.itemContent}>
              <Image source={require('@/assets/images/profile/info.png')} style={styles.itemIcon} />
              <Text style={styles.itemText}>{t('profile.index.items.selfInfo')}</Text>
            </View>
          </Cell>
          <Cell onPress={() => navigation.navigate('AccountSettings')} link>
            <View style={styles.itemContent}>
              <Image source={require('@/assets/images/profile/settings.png')} style={styles.itemIcon} />
              <Text style={styles.itemText}>{t('profile.index.items.accountSettings')}</Text>
            </View>
          </Cell>
          <Cell onPress={() => navigation.navigate('About')} link>
            <View style={styles.itemContent}>
              <Image source={require('@/assets/images/profile/about.png')} style={styles.itemIcon} />
              <Text style={styles.itemText}>{t('profile.index.items.about')}</Text>
            </View>
          </Cell>
          <Cell onPress={() => logout()} link>
            <View style={styles.itemContent}>
              <Image source={require('@/assets/images/profile/logout.png')} style={styles.itemIcon} />
              <Text style={styles.itemText}>{t('profile.index.items.logout')}</Text>
            </View>
          </Cell>
        </CellGroup>
      </SafeAreaWrap>
    </View>
  );
}

function CopyIconButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={onPress}>
      <Image source={require('@/assets/images/profile/copy.png')} style={styles.copyIcon}/>
    </TouchableHighlight>
  )
}

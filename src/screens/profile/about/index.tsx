import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import ScreenWrap from '@/components/ScreenWrap';
import { useTranslation } from 'react-i18next';

export default function AboutScreen() {
  const { t } = useTranslation();
  return (
    <ScreenWrap header={{ title: t('profile.about.headerTitle') }}>
      <View style={styles.card}>
        <Image source={require('@/assets/images/profile/about_logo.png')} style={styles.cardImage} />
        <View>
          <Text style={styles.cardTitle}>{t('profile.about.appName')}</Text>
        </View>
      </View>
    </ScreenWrap>
  );
}

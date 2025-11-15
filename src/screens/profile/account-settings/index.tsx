import { View } from 'react-native';
import { styles } from './styles';
import ScreenWrap from '@/components/ScreenWrap';
import { Cell, CellGroup, CellText } from '@/components/Cell';
import { useTranslation } from 'react-i18next';

export default function AccountSettingsScreen() {
  const { t } = useTranslation();
  return (
    <ScreenWrap header={{ title: t('profile.accountSettings.headerTitle') }}>
      <View style={styles.container}>
        <CellGroup borderRadius={6}>
          <Cell link>
            <CellText>{t('profile.accountSettings.blackList')}</CellText>
          </Cell>
          <Cell link>
            <CellText>{t('profile.accountSettings.language')}</CellText>
          </Cell>
        </CellGroup>
      </View>
    </ScreenWrap>
  );
}

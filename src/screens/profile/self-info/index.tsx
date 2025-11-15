import { View } from 'react-native';
import { styles } from './styles';
import ScreenWrap from '@/components/ScreenWrap';
import { Cell, CellGroup, CellText } from '@/components/Cell';
import Avatar from '@/components/Avatar';
import { DatePicker } from '@ant-design/react-native';
import BottomSheetButtonGroup from '@/components/BottomSheet/BottomSheetButtonGroup';
import { useState } from 'react';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestAndroidPerm } from '@/utils/permission';
import { useTranslation } from 'react-i18next';

export default function SelfInfoScreen() {
  const { t } = useTranslation();
  const [isGenderSelectorVisible, setIsGenderSelectorVisible] = useState(false);

  const [avatar, setAvatar] = useState<string | undefined>();

  const handlePicked = (asset?: Asset) => {
    if (!asset?.uri) return;
    setAvatar(asset.uri);
    uploadAvatar(asset);
  };

  async function uploadAvatar(asset: Asset) {
    const data = new FormData();
    data.append('avatar', {
      uri: asset.uri!,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || `avatar_${Date.now()}.jpg`,
    } as any);
  
    // await fetch('https://your.api/upload', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   body: data,
    // });
  }

  const openCamera = async () => {
    const ok = await requestAndroidPerm('camera');
    if (!ok) return;
    const res = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: false,
      includeBase64: false,
    });
    if (res.didCancel || res.errorCode) return;
    handlePicked(res.assets?.[0]);
  };

  const openLibrary = async () => {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
      includeBase64: false,
    });
    if (res.didCancel || res.errorCode) return;
    handlePicked(res.assets?.[0]);
  };

  return (
    <>
      <ScreenWrap header={{ title: t('profile.selfInfo.headerTitle') }}>
        <View style={styles.container}>
          <CellGroup borderRadius={6} style={styles.cellGroup_1}>
            <Cell link onPress={openLibrary} rightContent={<Avatar size={32} fallback="K"/>}>
              <CellText>{t('profile.selfInfo.labels.avatar')}</CellText>
            </Cell>
            <Cell link rightContent={<CellText>K</CellText>}>
              <CellText>{t('profile.selfInfo.labels.nickname')}</CellText>
            </Cell>
            <Cell onPress={() => setIsGenderSelectorVisible(true)} link rightContent={<CellText>{t('profile.selfInfo.genderOptions.male')}</CellText>}>
              <CellText>{t('profile.selfInfo.labels.gender')}</CellText>
            </Cell>
            <DatePicker>
              <Cell link rightContent={<CellText>1990-01-01</CellText>}>
                <CellText>{t('profile.selfInfo.labels.birthday')}</CellText>
              </Cell>
            </DatePicker>
          </CellGroup>

          <CellGroup borderRadius={6}>
            <Cell rightContent={<CellText>13800138000</CellText>}>
              <CellText>{t('profile.selfInfo.labels.phone')}</CellText>
            </Cell>
            <Cell link rightContent={<CellText>abc@a.com</CellText>}>
              <CellText>{t('profile.selfInfo.labels.email')}</CellText>
            </Cell>
          </CellGroup>
        </View>
      </ScreenWrap>

      <GenderSelector 
        visible={isGenderSelectorVisible}
        onRequestClose={() => setIsGenderSelectorVisible(false)}
        onSelect={() => {}}
      />
    </>
  );
}

function GenderSelector({ visible, onRequestClose, onSelect }: { visible: boolean, onRequestClose: () => void, onSelect: (gender: string) => void }) {
  const { t } = useTranslation();
  return (
    <BottomSheetButtonGroup visible={visible} onRequestClose={onRequestClose} buttons={[
      { label: t('profile.selfInfo.genderOptions.male'), onPress: () => onSelect('male')},
      { label: t('profile.selfInfo.genderOptions.female'), onPress: () => onSelect('female')},
      { label: t('profile.selfInfo.genderOptions.other'), onPress: () => onSelect('other')},
    ]} />
  );
}

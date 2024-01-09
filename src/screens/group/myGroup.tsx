import React, {useState, useEffect, useRef, RefObject} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  SectionList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {useContactStore} from '../../store/contact';
// import SearchDrawer from '../../components/searchDrawer';
import MyGroupCard from './myGroupCard';
import {groupContactsByFirstCharacter} from '../../utils/contactUtils';
import {GroupItem} from '../../types/entity';

interface SectionWithOffset {
  title: string;
  data: GroupItem[];
  offset: number;
}

const MyGroupPage = () => {
  const [search, setSearch] = useState('');
  const [alphabetHints, setAlphabetHints] = useState<string[]>([]);
  const [contactSections, setContactSections] = useState<SectionWithOffset[]>(
    [],
  );
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const sectionListRef: RefObject<SectionList> = useRef(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const popupSearchInputRef = useRef<TextInput | null>(null);
  const rawData = useContactStore(state => state.groupList);
  const data: GroupItem[] = rawData.sort((a: GroupItem, b: GroupItem) =>
    a.groupName.localeCompare(b.groupName),
  );

  useEffect(() => {
    const hints: string[] = Array.from(
      new Set(
        data.map((item: GroupItem) => {
          const firstChar = item.groupName.charAt(0).toUpperCase();
          return firstChar.match(/[A-Z]/) ? firstChar : '#';
        }),
      ),
    );
    const modifiedHints = hints.splice(hints.indexOf('#'), 1);
    hints.push(modifiedHints[0]);
    setAlphabetHints(hints);

    const groupedContacts = groupContactsByFirstCharacter(data, 'groupName');

    let totalOffset = 0;
    const sectionsWithOffset = groupedContacts.map(section => {
      const sectionWithOffset = {
        ...section,
        offset: totalOffset,
      };
      totalOffset += section.data.length;
      return sectionWithOffset;
    });

    setContactSections(sectionsWithOffset);
  }, [rawData]);

  const scrollToSection = (sectionIndex: number) => {
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
      });
    }
  };

  const handleHintItemPress = (index: number) => {
    setScrollEnabled(false);
    scrollToSection(index);

    setTimeout(() => {
      setScrollEnabled(true);
    }, 1000);
  };

  const openDrawer = () => {
    setIsDrawerVisible(true);
    if (popupSearchInputRef.current) {
      popupSearchInputRef.current.focus();
    }
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={Platform.OS === 'android' ? -60 : -70}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchBar} onPress={openDrawer}>
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={setSearch} // Update the 'search' state
          />
        </TouchableOpacity>
      </View>
      <SectionList
        ref={sectionListRef}
        sections={contactSections}
        keyExtractor={(item, index) =>
          item.friendInfo && item.friendInfo.userID
            ? item.friendInfo.userID + index.toString()
            : index.toString()
        }
        bounces={false}
        renderItem={({item}) => {
          return (
            <MyGroupCard
              nickname={item.groupName}
              groupID={item.groupID}
              faceURL={item.faceURL}
            />
          );
        }}
        renderSectionHeader={({section}) => {
          if (section.title !== '')
            return <Text style={styles.sectionHeader}>{section.title}</Text>;
          else return null;
        }}
        onScroll={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          const sectionIndex = contactSections.findIndex(
            section => offsetY >= section.offset,
          );
          if (sectionIndex !== -1) {
            const hint = contactSections[sectionIndex].title;
          }
        }}
        scrollEnabled={scrollEnabled}
      />
      <ScrollView
        style={styles.hintContainer}
        contentContainerStyle={styles.hintContentContainer}>
        {alphabetHints.map((hint, index) => (
          <TouchableOpacity
            key={index}
            style={styles.hintItem}
            onPress={() => handleHintItemPress(index)}>
            <Text>{hint}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <Modal
        isVisible={isDrawerVisible}
        onBackdropPress={closeDrawer}
        backdropOpacity={0.5}
        backdropColor="black">
        <SearchDrawer ref={popupSearchInputRef} />
      </Modal> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
  header: {
    backgroundColor: '#F6F6F6FF',
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 8,
    backgroundColor: '#E5E5E5FF',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#F6F6F6FF',
    padding: 8,
  },
  hintContainer: {
    position: 'absolute',
    right: 0,
    top: '30%',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  hintContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintItem: {
    padding: 4,
  },
});

export default MyGroupPage;

import React, {useState, useEffect, useRef, RefObject} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SectionList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SectionListData,
} from 'react-native';
import Modal from 'react-native-modal';
import {useContactStore} from '../../store/contact';
import {FriendUserItem} from '../../store/type';
// import SearchDrawer from '../../components/searchDrawer';
import Avatar from '../../components/avatar';
import {CreateGroup} from '../../api/openimsdk';
import {groupContactsByFirstCharacter} from '../../utils/contactUtils';

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({search, setSearch, onPress}) => (
  <TouchableOpacity style={styles.searchBar} onPress={onPress}>
    <TextInput placeholder="Search" value={search} onChangeText={setSearch} />
  </TouchableOpacity>
);
interface FriendItemProps {
  item: FriendUserItem;
  isSelected: boolean;
  onPress: () => void;
}

const FriendItem: React.FC<FriendItemProps> = ({item, isSelected, onPress}) => (
  <TouchableOpacity style={styles.friendSelect} onPress={onPress}>
    <Avatar nickname={item.nickname} faceURL={item.faceURL} />
    <Text>{item.nickname}</Text>
    {isSelected && <Text> Selected</Text>}
  </TouchableOpacity>
);
interface AlphabetHintListProps {
  hints: string[];
  onPressItem: (index: number) => void;
}

const AlphabetHintList: React.FC<AlphabetHintListProps> = ({
  hints,
  onPressItem,
}) => (
  <ScrollView
    style={styles.hintContainer}
    contentContainerStyle={styles.hintContentContainer}>
    {hints.map((hint, index) => (
      <TouchableOpacity
        key={index}
        style={styles.hintItem}
        onPress={() => onPressItem(index)}>
        <Text>{hint}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

interface SectionWithOffset {
  title: string;
  data: FriendUserItem[];
  offset: number;
}
const CreateGroupPage = () => {
  const [search, setSearch] = useState('');
  const [alphabetHints, setAlphabetHints] = useState<string[]>([]);
  const [contactSections, setContactSections] = useState<SectionWithOffset[]>(
    [],
  );
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const sectionListRef =
    useRef<SectionList<FriendUserItem, SectionWithOffset>>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const popupSearchInputRef = useRef<TextInput | null>(null);
  const rawData = useContactStore(state => state.friendList);
  const data: FriendUserItem[] = rawData.sort(
    (a: FriendUserItem, b: FriendUserItem) =>
      a.nickname.localeCompare(b.nickname),
  );
  const [selectedFriend, setSelectedFriend] = useState<string[]>([]);

  useEffect(() => {
    const hints: string[] = Array.from(
      new Set(
        data.map((item: FriendUserItem) => {
          const firstChar = item.nickname.charAt(0).toUpperCase();
          return firstChar.match(/[A-Z]/) ? firstChar : '#';
        }),
      ),
    );
    const modifiedHints = hints.splice(hints.indexOf('#'), 1);
    hints.push(modifiedHints[0]);
    setAlphabetHints(hints);

    const groupedContacts = groupContactsByFirstCharacter(data, 'nickname');

    let totalOffset = 0;
    const sectionsWithOffset = groupedContacts.map(section => {
      const sectionWithOffset = {
        ...section,
        offset: totalOffset,
      };
      const headerHeight = 16;
      const itemHeight = 32;
      totalOffset += section.data.length * itemHeight + headerHeight;
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

  const toggleSelectFriend = (userID: string) => {
    if (selectedFriend.includes(userID)) {
      setSelectedFriend(selectedFriend.filter(id => id !== userID));
    } else {
      setSelectedFriend([...selectedFriend, userID]);
    }
  };
  const renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<FriendUserItem, SectionWithOffset>;
  }) => {
    return section.title !== '' ? (
      <Text style={styles.sectionHeader}>{section.title}</Text>
    ) : null;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={Platform.OS === 'android' ? -60 : -70}>
      <View style={styles.header}>
        <SearchBar search={search} setSearch={setSearch} onPress={openDrawer} />
      </View>
      <SectionList
        ref={sectionListRef}
        sections={contactSections}
        keyExtractor={(item, index) =>
          item && item.userID
            ? item.userID + index.toString()
            : index.toString()
        }
        bounces={false}
        renderItem={({item}) => {
          const isSelected = selectedFriend.includes(item.userID);
          return (
            <FriendItem
              item={item}
              isSelected={isSelected}
              onPress={() => toggleSelectFriend(item.userID)}
            />
          );
        }}
        renderSectionHeader={renderSectionHeader}
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
      <AlphabetHintList
        hints={alphabetHints}
        onPressItem={handleHintItemPress}
      />

      <TouchableOpacity
        onPress={() => {
          console.log('selectedFriends:', selectedFriend);
          CreateGroup('defaultgroup', 2, selectedFriend);
        }}>
        <Text>Accept</Text>
      </TouchableOpacity>
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
    fontSize: 8,
  },
  friendSelect: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

export default CreateGroupPage;

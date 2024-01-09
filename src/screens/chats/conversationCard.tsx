import {
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Avatar from '../../components/avatar';
import {useState, useEffect} from 'react';
import {API} from '../../api/typings';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ChatRoom from './chatRoom';
import {
  GetAdvancedHistoryMessageListReverse,
  MarkConversationMessageAsRead,
} from '../../api/openimsdk';
import {ConversationItem, MessageItem} from '../../types/entity';
import {useConversationStore} from '../../store/conversation';
import {formatMessageByType} from '../../utils/formatMsg';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  calendar: {
    sameDay: 'HH:mm',
    nextDay: '[tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[yesterday] HH:mm',
    lastWeek: 'dddd HH:mm',
    sameElse: 'YYYY/M/D HH:mm',
  },
});
dayjs.updateLocale('zh-cn', {
  calendar: {
    sameDay: 'HH:mm',
    nextDay: '[明天]',
    nextWeek: 'dddd',
    lastDay: '[昨天] HH:mm',
    lastWeek: 'dddd HH:mm',
    sameElse: 'YYYY年M月D日 HH:mm',
  },
});

const formatDate = (timestamp: number) => {
  if (!timestamp) return '';

  const fromNowStr = dayjs(timestamp).fromNow();

  if (fromNowStr.includes('date.second')) {
    return 'date.justNow';
  }

  if (
    !fromNowStr.includes('date.second') &&
    !fromNowStr.includes('date.minute')
  ) {
    return dayjs(timestamp).calendar();
  }

  return fromNowStr;
};

const ConversationCard = ({item}: {item: ConversationItem}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const updateCurrentConversation = useConversationStore(
    state => state.updateCurrentConversation,
  );

  const handleConversation = async () => {
    updateCurrentConversation(item);
    MarkConversationMessageAsRead(item.conversationID);
    InteractionManager.runAfterInteractions(() => {
      // navigate after animations are complete
      navigation.navigate('ChatRoom', {item});
    });
  };
  const getLatestMessageContent = () => {
    if (item.latestMsg) {
      return formatMessageByType(JSON.parse(item.latestMsg) as MessageItem);
    }
    return '';
  };
  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.contactItem} onPress={handleConversation}>
      <Avatar nickname={item.showName} faceURL={item.faceURL} />
      <View style={styles.messageContainer}>
        <View style={styles.row}>
          <Text>{item.showName}</Text>
          <Text>{formatDate(item.latestMsgSendTime)}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text>{getLatestMessageContent()}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  messageContainer: {flex: 1},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default ConversationCard;

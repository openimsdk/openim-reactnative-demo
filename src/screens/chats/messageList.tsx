// import React from 'react';
// import {FlatList, RefreshControl, View} from 'react-native';
// import TextChatCard from './chatCards/textChatCard';
// import ImageCard from './chatCards/imageCard';

// const MessageList = ({messages, onRefresh, isRefreshing, refreshKey}) => {
//   return (
//     <FlatList
//       key={refreshKey} // Add the refreshKey here
//       data={messages}
//       keyExtractor={(item, index) => item.id || index.toString()}
//       renderItem={({item: message}) => {
//         if (message.contentType === 101) {
//           return <TextChatCard message={message} />;
//         } else if (message.contentType === 102) {
//           return <ImageCard message={message} />;
//         }
//         return <View />;
//       }}
//       refreshControl={
//         <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
//       }
//     />
//   );
// };

// export default MessageList;

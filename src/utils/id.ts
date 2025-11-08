import uuid from 'react-native-uuid';

export default function id(): string {
  return uuid.v4()
}

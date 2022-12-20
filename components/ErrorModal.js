import { Alert } from 'react-native'

export default function ErrorModal(
  text = 'Terjadi kesalahan, silahkan ulangi kembali'
) {
  return Alert.alert('Kesalahan', { text }, [{ text: 'OK' }])
}

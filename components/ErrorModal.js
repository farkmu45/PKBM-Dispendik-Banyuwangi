import { Alert } from 'react-native'

export default function ErrorModal(
  text = 'Terjadi kesalahan saat menambahkan data, silahkan ulangi kembali'
) {
  return Alert.alert('Kesalahan', { text }, [{ text: 'OK' }])
}

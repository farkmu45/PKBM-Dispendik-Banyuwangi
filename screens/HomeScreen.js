import { View, Text, Button } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Header />
      <View className='items-center'>
        <Text>Selamat Datang</Text>
        <Button title='Lebih Lanjut' />

        <Text>PKBM Dinas Pendidikan Kabupaten Banyuwangi</Text>
        <Text className='text-center'>
          Pusat Kegiatan Belajar Masyarakat disingkat PKBM, adalah lembaga yang
          dibentuk oleh masyarakat untuk masyarakat yang bergerak dalam bidang
          pendidikan Non Formal yang masih berada di bawah pengawasan dan
          bimbingan dari Dinas Pendidikan Nasional.
        </Text>

        <Text>Tujuan</Text>

        <Text className='text-center'>
          PKBM dibentuk dengan tujuan membuka kesempatan seluas luasnya bagi
          masyarakat kurang mampu untuk meningkatkan pengetahuan, sikap mental
          dan keterampilan. Ketiga unsur ini akan membentuk masyarakat yang
          mampu bersaing dan mencari nafkah secara mandiri.
        </Text>

        <Text>Hubungi Kami</Text>
      </View>
    </SafeAreaView>
  )
}

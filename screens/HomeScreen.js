import { View, Text, Button } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Header />
      <View className='items-center'>
        <Text className='text-base text-center my-5 font-semibold'>
          Selamat Datang
        </Text>
        <Button title='Lebih Lanjut' />
        <Text className='text-base text-center my-5 font-semibold'>
          PKBM Dinas Pendidikan Kabupaten Banyuwangi
        </Text>
        <Text className='text-center mx-5 '>
          Pusat Kegiatan Belajar Masyarakat disingkat PKBM, adalah lembaga yang
          dibentuk oleh masyarakat untuk masyarakat yang bergerak dalam bidang
          pendidikan Non Formal yang masih berada di bawah pengawasan dan
          bimbingan dari Dinas Pendidikan Nasional.
        </Text>

        <Text className='text-base text-center my-5 font-semibold'>Tujuan</Text>

        <Text className='text-center mx-5'>
          PKBM dibentuk dengan tujuan membuka kesempatan seluas luasnya bagi
          masyarakat kurang mampu untuk meningkatkan pengetahuan, sikap mental
          dan keterampilan. Ketiga unsur ini akan membentuk masyarakat yang
          mampu bersaing dan mencari nafkah secara mandiri.
        </Text>

        <Text className='text-base text-center my-5 font-semibold'>
          Hubungi Kami
        </Text>
        <Text className='text-left self-start mx-5 '>Kontak : 90128301</Text>
        <Text className='text-left self-start mx-5 '>
          Email : pkmb@gmail.com
        </Text>
        <Text className='text-left self-start mx-5 '>
          Alamat : Jl. K.H. Agus Salim No.5, Sobo, Kec. Banyuwangi, Kab.
          Banyuwangi, Jawa Timur, 68418
        </Text>
      </View>
    </SafeAreaView>
  )
}

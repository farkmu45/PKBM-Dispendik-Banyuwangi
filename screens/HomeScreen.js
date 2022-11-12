import React from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1'>
      <Header />

      <ScrollView>
        <View className='items-center pb-10 pt-5 px-4'>
          <Text className='text-base text-center font-semibold'>
            Selamat Datang
          </Text>
          <Button title='Lebih Lanjut' />
          <Text className='text-base text-center my-5 font-semibold'>
            PKBM Dinas Pendidikan Kabupaten Banyuwangi
          </Text>
          <Text className='text-base text-center'>
            Pusat Kegiatan Belajar Masyarakat disingkat PKBM, adalah lembaga
            yang dibentuk oleh masyarakat untuk masyarakat yang bergerak dalam
            bidang pendidikan Non Formal yang masih berada di bawah pengawasan
            dan bimbingan dari Dinas Pendidikan Nasional.
          </Text>

          <Text className='text-base text-center my-5 font-semibold'>
            Tujuan
          </Text>

          <Text className='text-base text-center'>
            PKBM dibentuk dengan tujuan membuka kesempatan seluas luasnya bagi
            masyarakat kurang mampu untuk meningkatkan pengetahuan, sikap mental
            dan keterampilan. Ketiga unsur ini akan membentuk masyarakat yang
            mampu bersaing dan mencari nafkah secara mandiri.
          </Text>

          <Text className='text-base text-center my-5 font-semibold'>
            Hubungi Kami
          </Text>
          <Text className='self-start'>Kontak : 90128301</Text>
          <Text className='self-start'>Email : pkmb@gmail.com</Text>
          <Text className='self-start'>
            Alamat : Jl. K.H. Agus Salim No.5, Sobo, Kec. Banyuwangi, Kab.
            Banyuwangi, Jawa Timur, 68418
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

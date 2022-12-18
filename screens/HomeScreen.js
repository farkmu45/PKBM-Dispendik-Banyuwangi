import React from 'react'
import { ScrollView, Text, View, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import Header from '../components/Header'

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1'>
      <Header />

      <ScrollView>
        <View className='items-center pb-10 pt-5 px-4'>
          <Text className='text-lg text-center font-Bold'>SELAMAT DATANG</Text>
          <Button
            className='mt-2'
            onPress={async () =>
              await Linking.openURL('https://pendidikan.banyuwangikab.go.id')
            }
          >
            Lebih Lanjut
          </Button>
          <Text className='font-SemiBold text-base text-center mb-2 mt-6'>
            PKBM Dinas Pendidikan Kabupaten Banyuwangi
          </Text>
          <Text className='font-Regular text-base text-center'>
            Pusat Kegiatan Belajar Masyarakat disingkat PKBM, adalah lembaga
            yang dibentuk oleh masyarakat untuk masyarakat yang bergerak dalam
            bidang pendidikan Non Formal yang masih berada di bawah pengawasan
            dan bimbingan dari Dinas Pendidikan Nasional.
          </Text>

          <Text className='text-base text-center mb-2 mt-6 font-SemiBold'>
            Tujuan
          </Text>

          <Text className='font-Regular text-base text-center'>
            PKBM dibentuk dengan tujuan membuka kesempatan seluas luasnya bagi
            masyarakat kurang mampu untuk meningkatkan pengetahuan, sikap mental
            dan keterampilan. Ketiga unsur ini akan membentuk masyarakat yang
            mampu bersaing dan mencari nafkah secara mandiri.
          </Text>

          <Text className='text-base text-center mb-2 mt-6 font-SemiBold'>
            Hubungi Kami
          </Text>
          <Text className='font-Regular self-start text-base'>
            Kontak : 90128301
          </Text>
          <Text className='font-Regular self-start text-base'>
            Email : pkmb@gmail.com
          </Text>
          <Text className='font-Regular self-start text-base'>
            Alamat : Jl. K.H. Agus Salim No.5, Sobo, Kec. Banyuwangi, Kab.
            Banyuwangi, Jawa Timur, 68418
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

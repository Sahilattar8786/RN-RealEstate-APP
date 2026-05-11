import FeatureCard from '@/component/featureCard';
import PropertyCard from '@/component/PropertyCard';
import { supabase } from '@/lib/superbase';
import { Property } from '@/types';
import { useAuth, useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
export default function Home() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [featuredListings, setFeaturedListings] = useState<Property[]>([]);
  const [recommendedListings, setRecommendedListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    const { data: featuredData } = await supabase
      .from("properties")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    const { data: recommendedData } = await supabase
      .from("properties")
      .select("*")
      .eq("is_featured", false)
      .order("created_at", { ascending: false });

    setFeaturedListings(featuredData || []);
    setRecommendedListings(recommendedData || []);
    setLoading(false);
  }
  useFocusEffect(
    useCallback(() => {
      fetchProperties()
    }, [])
  )
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      {
        loading ? (
          <View className="items-center flex-1 py-10">
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <FlatList
          data={recommendedListings}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <HeaderComponent firstName={user?.firstName} loading={loading} data={featuredListings} />
            )
          }}
          renderItem={({ item }) => {
            return (
              <PropertyCard property={item} />
            )
          }}
          ListEmptyComponent={() => {
            return (
              <View className="items-center flex-1 py-10">
                <Text className="text-gray-500">No listings found</Text>
              </View>
            )
          }}
        />
        )
      }
     
    </SafeAreaView>
  )
}

const HeaderComponent = ({ firstName , loading , data }: { firstName?: string | null, loading?: boolean, data?: Property[] }) => {
  return (
    <View>
      <View className='flex-row items-center justify-between px-5 pt-4 pb-5'>
        <Image
          source={require('@/assets/images/kribb.png')}
          style={{ width: 90, height: 45 }}
        />
        <View className="items-end">
          <Text className="text-lg font-bold">Welcome Back,</Text>
          <Text className="text-gray-500">Hello, {firstName ?? "User"}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/search")}
        className="mx-5 mb-6 flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 gap-3"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        <Text className="text-gray-500">Search for a property</Text>
        <TouchableOpacity
         onPress={() => router.push("/search?openFilters=true")}
         className="w-8 h-8 bg-blue-600 rounded-xl items-center justify-center"
         >
          <Ionicons name="search" size={24} color="blue" />
        </TouchableOpacity>
      </TouchableOpacity>
      <Text className="text-gray-500 px-5 font-bold mb-5">Recommended</Text>
      <View className="mb-6">
     
      {
        loading ? (
          <View className="items-center flex-1 py-10">
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <FlatList
            data={data}
           keyExtractor={(item) => item.id}
           renderItem={({ item }) => <FeatureCard property={item} />}
           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={{ paddingHorizontal: 20 }}
        />
        )
      }
      </View>
    

    </View>
  )
}
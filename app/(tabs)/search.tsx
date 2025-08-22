import SearchBar from "@/components/SearchBar";
import SunCard from "@/components/SunCard";
import { images } from "@/constants/images";
import { fetchAllChartLines } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TextInput, View } from "react-native";


const search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<TextInput>(null);

    useFocusEffect(
        useCallback(() => {
            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timeout);
        }, [])
    );

    const {
        data: plot,
        loading,
        error,
        refetch: loadPlot,
        reset,
    } = useFetch(() => fetchAllChartLines({ query: searchQuery }), false);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadPlot();
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);


    return (
        <View className="flex-1 bg-background px-10">
            <FlatList
                data={plot}
                renderItem={({ item }) => <SunCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className='w-full flex-row justify-center mt-20 items-center'>
                            <Image source={images.logoMain} className='w-16 h-16' />
                        </View>
                        <View className='my-5'>
                            <SearchBar
                                placeholder='Search ...'
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                                editable={true}
                                autoFocus={true}
                            />
                        </View>
                        {loading && (
                            <ActivityIndicator size='large' color="#0000FF" className='my-3' />
                        )}
                        {error && (
                            <Text className='text-red-500 px-5 my-3'>Error: {error.message}</Text>
                        )}

                        {!loading && !error && searchQuery.trim() && (
                            <Text className='text-xl text-black font-bold'>Search results for{' '}
                                <Text className='text-accent'>{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className='mt-10 px-10'>
                            <Text className='text-center text-gray-500'>
                                {searchQuery.trim() ? 'No plot found' : 'The future of Data Driven Information is here'}
                            </Text>
                        </View>
                    ) : null
                }
            />

        </View>

    );
}

export default search
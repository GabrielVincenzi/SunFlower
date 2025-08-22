import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SunCard = ({ id, title, description, db, variables, geos, startPeriod, endPeriod }: Card) => {
    return (
        <TouchableOpacity
            className='w-full bg-gray-100 rounded-xl p-5 flex flex-row'
            onPress={() =>
                router.push({
                    pathname: "/infos/[id]", // maps to [id].tsx
                    params: {
                        id,
                        title,
                        db,
                        startPeriod,
                        endPeriod,
                        variables: JSON.stringify(variables),
                        geos: JSON.stringify(geos),
                    }
                })
            }>
            <View className='flex-col items-left justify-between ml-5'>
                <Text className='text-base font-bold text-black mt-2' numberOfLines={1}>{title}</Text>
                <Text className='text-sm text-light-300 font-medium mt-1'>{description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SunCard
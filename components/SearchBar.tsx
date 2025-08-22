import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    placeholder: string;
    onPress?: () => void;
    value: string;
    editable?: boolean;
    autoFocus?: boolean;
    onChangeText: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText, editable = true, autoFocus = false }: Props) => {
    return (
        <View className="flex-row items-center bg-gray-100 rounded-full px-5 py-4 gap-x-2">
            <Image
                source={require('../assets/icons/search.png')} // replace with your actual path
                className="size-5"
                resizeMode="contain"
                tintColor="#F3DB75"
            />

            {editable ? (
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#A8B5DB"
                    autoFocus={autoFocus}
                    className="flex-1 ml-2 text-black"
                />
            ) : (
                <TouchableOpacity className="flex-1 ml-2" onPress={onPress} activeOpacity={0.7}>
                    <Text className="text-black text-base text-left">{placeholder}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SearchBar
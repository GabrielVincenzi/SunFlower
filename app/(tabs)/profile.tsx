import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
    return (
        <View className="flex-1 bg-background px-10 pt-20">
            {/* Title 
            <Text className="text-black text-xl font-bold mb-8">Profile</Text>*/}

            {/* Avatar Section */}
            <View className="items-center mb-10">
                <View className="w-24 h-24 bg-black rounded-full mb-2 relative">
                    {/* Optional: Notification Dot */}
                    <View className="w-4 h-4 bg-black border-2 border-white rounded-full absolute bottom-1 right-1" />
                </View>
                <Text className="text-xl font-bold text-black mt-2">Gabriel</Text>
                <Text className="text-sm text-gray-400">gabriel.vincenzi01@gmail.com</Text>
            </View>

            {/* Options */}
            <TouchableOpacity className="flex-row items-center mb-6" activeOpacity={0.7}>
                <Feather name="settings" size={20} color="black" />
                <Text className="text-base text-black ml-4">Preferences</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center mb-6" activeOpacity={0.7}>
                <Feather name="help-circle" size={20} color="black" />
                <Text className="text-base text-black ml-4">Customer Support</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center" activeOpacity={0.7}>
                <Feather name="log-out" size={20} color="black" />
                <Text className="text-base text-black ml-4">Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;

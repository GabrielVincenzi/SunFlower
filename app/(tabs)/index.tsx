import SearchBar from "@/components/SearchBar";
import SunCard from "@/components/SunCard";
import { images } from "@/constants/images";
import { fetchAllChartDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";


export default function Index() {
    const router = useRouter();

    const {
        data: chart,
        loading: chartLoading,
        error: chartError
    } = useFetch(() => fetchAllChartDetails({ query: '' }))

    return (
        <View className="flex-1 bg-background">
            <ScrollView className="flex-1 px-10" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
                <Image source={images.logoMain} className="w-16 h-16 mt-20 mb-5 mx-auto" />
                {chartLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000FF"
                        className="mt-10 self-center"
                    />
                ) : chartError ? (
                    <Text>Error: {chartError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for reality"
                            value=""
                            editable={false}
                            onChangeText={() => { }}
                        />

                        <>
                            <Text className="text-lg text-black font-bold mt-5 mb-3">This Week</Text>
                            <FlatList
                                data={chart}
                                renderItem={({ item }) => (
                                    <SunCard {...item} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={1}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                                ItemSeparatorComponent={() => <View style={{ height: 16 }} />} // 16px vertical space
                            />
                        </>
                    </View>
                )}

            </ScrollView>

        </View>

    );
}

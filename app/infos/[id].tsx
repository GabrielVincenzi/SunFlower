import SunRadarChart from '@/components/SunRadarChart';
import { icons } from '@/constants/icons';
import { fetchChartDataPlaceHolder } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


const PlotInfo = ({ label }: { label: string }) => (
    <View className="flex-col items-start justify-center mt-4 px-6">
        <Text className="text-neutral-800 font-semibold text-lg mb-2">{label}</Text>
        <Text className="text-neutral-500 leading-relaxed text-base">
            This chart illustrates pollution levels across various regions, comparing richer and poorer areas.
            While richer areas consistently show higher pollution levels, both groups exhibit a general downward
            trend over time — indicating an overall improvement in environmental conditions.
        </Text>
    </View>
);

const PlotDetails = () => {
    const screenWidth = Dimensions.get("window").width * 0.85;
    const { id, title, db, variables, geos, startPeriod, endPeriod } = useLocalSearchParams();

    // Type assertions
    const chartId = id as string;
    const chartTitle = title as string;
    const chartDb = db as string;
    const chartVariables = variables ? JSON.parse(variables as string) : [];

    // Placeholders
    const chartStartPeriod = startPeriod as string;
    const chartEndPeriod = endPeriod as string | undefined;
    const chartGeos = geos ? JSON.parse(geos as string) : [];
    ////////////////

    const initialGeos = (geos as string) || "";
    const initialStartPeriod = startPeriod as string;
    const initialEndPeriod = endPeriod as string | undefined;

    // State for inputs (editable)
    const [selectedGeos, setSelectedGeos] = useState(initialGeos);
    const [selectedStartPeriod, setSelectedStartPeriod] = useState(initialStartPeriod);
    const [selectedEndPeriod, setSelectedEndPeriod] = useState<string | undefined>(initialEndPeriod);

    // State for triggering fetch
    const [query, setQuery] = useState({
        geos: selectedGeos,
        startPeriod: selectedStartPeriod,
        endPeriod: selectedEndPeriod,
    });

    // State for triggering fetch
    const { data: apiData, loading } = useFetch(() =>
        fetchChartDataPlaceHolder({
            db: chartDb,
            variables: chartVariables,
            geos: query.geos,
            startPeriod: query.startPeriod,
            endPeriod: query.endPeriod
        })
    );

    // Handle OK button
    const handleOk = () => {
        setQuery({
            geos: selectedGeos,
            startPeriod: selectedStartPeriod,
            endPeriod: selectedEndPeriod,
        });
    };

    if (loading)
        return <Text className="text-neutral-600 text-center mt-10">Loading...</Text>;
    if (!apiData)
        return <Text className="text-neutral-600 text-center mt-10">No data available</Text>;

    return (
        <View className="bg-background flex-1">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <View className="px-6 mt-8 mb-4">
                    <Text className="text-neutral-900 mb-4 font-bold text-3xl tracking-tight">
                        {chartTitle}
                    </Text>
                </View>

                {/* Chart */}
                <View className="px-4">
                    <SunRadarChart
                        screenWidth={screenWidth}
                        apiData={apiData}
                    />
                </View>

                {/* Controls */}
                <View className="px-6 space-y-4 mb-6">
                    {/* Geos input */}
                    <TextInput
                        className="border border-neutral-300 rounded-lg p-3"
                        placeholder="Enter geos (comma separated, e.g. US+FR+DE)"
                        value={selectedGeos}
                        onChangeText={setSelectedGeos}
                    />

                    {/* Start Period */}
                    <TextInput
                        className="border border-neutral-300 rounded-lg p-3"
                        placeholder="Start Period"
                        value={selectedStartPeriod}
                        onChangeText={setSelectedStartPeriod}
                    />

                    {/* End Period */}
                    <TextInput
                        className="border border-neutral-300 rounded-lg p-3"
                        placeholder="End Period (optional)"
                        value={selectedEndPeriod}
                        onChangeText={setSelectedEndPeriod}
                    />

                    {/* OK Button */}
                    <Button title="OK" onPress={handleOk} />
                </View>

                {/* Time info */}
                <View className="mt-3 px-6">
                    <Text className="text-neutral-500 text-sm">Data from 2004 to 2021</Text>
                </View>

                {/* Overview */}
                <PlotInfo label="Overview" />
            </ScrollView>

            {/* Bottom button */}
            <TouchableOpacity
                className="absolute bottom-6 left-6 right-6 bg-secondary rounded-2xl py-4 flex-row items-center justify-center"
                onPress={router.back}
                activeOpacity={0.85}
            >
                <Image source={icons.arrow} className="size-5 mr-2 rotate-180" tintColor="#fff" />
                <Text className="text-white font-semibold text-base">Go back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PlotDetails;


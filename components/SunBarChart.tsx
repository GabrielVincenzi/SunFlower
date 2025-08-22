import React from 'react';
import { View } from 'react-native';
import { BarChart, barDataItem } from "react-native-gifted-charts";

function SunBarChart({ screenWidth, apiData }: ChartProps) {
    // Transform the generic API response into barDataItem[]
    const chartData: barDataItem[] = apiData.availableGeos.map((geo) => {
        const key = Object.keys(apiData.series).find((k) => k.endsWith(`_${geo}`));
        const value = key && apiData.series[key]?.[0]?.value !== null
            ? apiData.series[key][0].value
            : 0;

        return {
            value,
            label: geo,
            frontColor: geo === "US" ? "#3b82f6" : "#f87171",
        };
    });

    return (
        <View className="w-full px-4">
            <BarChart
                data={chartData}
                width={screenWidth * 9 / 10}
                barWidth={40}
                spacing={20}
                barBorderTopLeftRadius={6}
                barBorderTopRightRadius={6}
                yAxisThickness={0}
                xAxisThickness={1}
                noOfSections={4}
                initialSpacing={20}
                isAnimated
                yAxisTextStyle={{ color: "grey" }}
                xAxisLabelTextStyle={{
                    fontSize: 14,
                    textAlign: "center",
                    color: "grey",
                }}
            />
        </View>
    );
}

export default SunBarChart;

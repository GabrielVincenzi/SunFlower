import React from 'react';
import { View } from 'react-native';
import { RadarChart, barDataItem } from "react-native-gifted-charts";

function SunRadarChart({ screenWidth, apiData }: ChartProps) {
    // Transform API response into barDataItem[]
    const chartData: barDataItem[] = apiData.availableGeos.map((geo) => {
        const key = Object.keys(apiData.series).find((k) => k.endsWith(`_${geo}`));
        const value = key && apiData.series[key]?.[0]?.value != null
            ? apiData.series[key][0].value
            : 0;

        return {
            value,
            label: geo ?? "", // fallback ensures string
            frontColor: geo === "US" ? "#3b82f6" : "#f87171",
        };
    });

    // Use non-null assertion to guarantee number[] and string[]
    const dataValues: number[] = chartData.map(item => item.value!);
    const labels: string[] = chartData.map(item => item.label!);

    return (
        <View className="w-full px-4">
            <RadarChart
                data={dataValues}
                labels={labels}
                isAnimated
                noOfSections={4}
                //circular
                maxValue={Math.max(...dataValues) + 1}
                labelsPositionOffset={1}
                polygonConfig={{ stroke: "#F3DB75", fill: "#F3DB75", opacity: 0.8 }}
                gridConfig={{ opacity: 1, fill: "#ffffff" }}
            />
        </View>
    );
}

export default SunRadarChart;

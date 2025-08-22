import React from 'react';
import { View } from 'react-native';
import { LineChart } from "react-native-gifted-charts";

function CustomLineChart({ screenWidth, apiData }: ChartProps) {
    const chartData = apiData.availableGeos.map((geo, idx) => {
        const key = Object.keys(apiData.series).find((k) => k.endsWith(`_${geo}`));
        const values = key ? apiData.series[key] : [];

        return {
            data: values.map((point, i) => ({
                value: point.value,
                label: apiData.availablePeriods[i],
            })),
            color: idx === 0 ? '#3b82f6' : '#f87171',
        };
    });

    const maxLength = Math.max(...chartData.map((d) => d.data.length));
    const spacing = maxLength > 1 ? screenWidth / maxLength : 40;

    return (
        <View className="w-2/3">
            <LineChart
                dataSet={chartData}
                width={screenWidth * 9 / 10}
                spacing={spacing}
                hideDataPoints={false}
                hideRules
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisLabelTextStyle={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: 'grey',
                }}
                yAxisTextStyle={{ color: 'grey' }}
            />
        </View>
    );
}

export default CustomLineChart;
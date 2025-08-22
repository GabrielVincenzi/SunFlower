# Building a Project:
npx create-expo-app@latest ./
npm run reset-project
npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context react-native-modal
npm install react-native-linear-gradient react-native-gifted-charts 
npx tailwindcss init
npx expo customize metro.config.js

# Clerk:
npx expo install react-dom react-native-web @expo/metro-runtime
npm install @clerk/clerk-expo
npm install expo-secure-store


# ChartData
for (let i = 0; i < maxLength; i++) {
        // Rich
        barData.push({
            value: linesData[0]?.data[i]?.value || 0,
            frontColor: linesData[0]?.color || '#2196f3',
            label: String(2004 + i), // label only on first bar in the group
        });

        // Poor
        barData.push({
            value: linesData[1]?.data[i]?.value || 0,
            frontColor: linesData[1]?.color || '#2196f3',
            label: '', // skip label
        });

        // Spacer
        barData.push({
            value: 0,
            frontColor: 'transparent',
            label: '',
        });
    }
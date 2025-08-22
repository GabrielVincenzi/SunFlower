interface InputProps {
  label: string,
  placeholder: string,
  icon: ImageSourcePropType,
  secureTextEntry?: boolean,
  classname?: string,
  value: string,
  onChangeText: (text: string) => void,
}

interface ButtonProps {
  onPress?: () => void;
  title: string,
  IconLeft?: React.ComponentType<{ size?: number; color?: string }>,
  IconRight?: React.ComponentType<{ size?: number; color?: string }>,
  classname?: string,
  textClassname?: string,
}

interface Card {
  id: string;
  title: string;
  description: string;
  db: string;
  startPeriod: string,
  endPeriod: string,
  variables: string;
  geos: string;
}

interface FetchChartParams {
  db: string;
  variables: string;
  geos: string;
  startPeriod: string,
  endPeriod?: string,
}


type ApiResponsePlaceHolder = {
  availableGeos: string[];
  availablePeriods: string[];
  availableUnits: string[];
  series: Record<string, { value: number }[]>;
};

type ApiResponse = {
  data: any
}

type ChartProps = {
  screenWidth: number;
  apiData: ApiResponsePlaceHolder;
};
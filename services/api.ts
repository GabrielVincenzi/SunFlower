export const fetchAllChartDetails = async ({ query }: { query: string }) => {
    const allDetails = [
        {
            id: '1',
            title: 'Average Temperature by City',
            description: 'Hotter but not everywhere the same.',
            db: 'weather',
            variables: 'Temperature',
            geos: 'US+FR',
            startPeriod: '2024-01-01',
            endPeriod: '2025-01-01',
            chartType: 'radar',
        },
        {
            id: '2',
            title: 'Demographics by NUTS-3 regions',
            description: 'Older and fewer each generation.',
            db: 'demographics',
            variables: 'Temperature',
            geos: 'US+FR',
            startPeriod: '2024-01-01',
            endPeriod: '2025-01-01',
            chartType: 'radar',
        },
        {
            id: '3',
            title: 'Pollution in rich and poor areas',
            description: 'A jeopardized dynamic.',
            db: 'pollution',
            variables: 'Temperature',
            geos: 'US+FR',
            startPeriod: '2024-01-01',
            endPeriod: '2025-01-01',
            chartType: 'radar',
        },
        {
            id: '4',
            title: 'Unemployment by sex, age and educational attainment',
            description: 'Why searching and not finding?',
            db: 'pollution',
            variables: 'Temperature',
            geos: 'US+FR',
            startPeriod: '2024-01-01',
            endPeriod: '2025-01-01',
            chartType: 'radar',
        },
        {
            id: '5',
            title: 'Inactive population as a percentage of the total population',
            description: 'A threat to active action.',
            db: 'pollution',
            variables: 'Temperature',
            geos: 'US+FR',
            startPeriod: '2024-01-01',
            endPeriod: '2025-01-01',
            chartType: 'radar',
        },
    ];

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return allDetails;

    return allDetails.filter(detail => detail.title.toLowerCase().includes(normalizedQuery));
};

export const fetchDbAvailabilities = async ({ db }: { db: string }) => {
    const availables = [
        {
            db: 'weather',
            geos: 'US+FR+DE+IS+LD+BD+UZ+AK',
            periods: '2022-01-01+2023-01-01+2024-01-01+2025-01-01',
        },
    ];

    return availables;
};


export const fetchChartData = async ({ db, variables, geos, startPeriod, endPeriod }: FetchChartParams): Promise<ApiResponse> => {
    const baseUrl = 'http://localhost:5013/chart/';

    const geosParam = geos.replace(/\+/g, '%2B');
    const params = new URLSearchParams({
        Geos: geosParam,
        Variables: variables,
        StartPeriod: startPeriod,
    });

    if (endPeriod) {
        params.append('EndPeriod', endPeriod);
    }

    const apiUrl = `${baseUrl}${db}?${params.toString()}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error("Error fetching chart data:", error);
        throw error;
    }
};


export const fetchChartDataPlaceHolder = async ({ db, variables, geos, startPeriod, endPeriod }: FetchChartParams): Promise<ApiResponsePlaceHolder> => {
    try {
        // Placeholder API response
        const json: ApiResponsePlaceHolder = {
            availableGeos: ["FR", "US", "DE", "GB", "DA"],
            availablePeriods: ["2024-01-01"],
            availableUnits: [],
            series: {
                Temperature_US: [{ value: 5.2 }],
                Temperature_FR: [{ value: 2.1 }],
                Temperature_DE: [{ value: 3.1 }],
                Temperature_GB: [{ value: 4.5 }],
                Temperature_DA: [{ value: 5.5 }],
            },
        };

        return json;
    } catch (error) {
        console.error("Error fetching chart data:", error);
        throw error;
    }
};


// const json: ApiResponsePlaceHolder = {
//     availableGeos: ["FR", "US"],
//     availablePeriods: ["2024-01-01", "2025-01-01", "2026-01-01"],
//     availableUnits: [],
//     series: {
//         Temperature_US: [{ value: 5.2 }, { value: 5.2 }, { value: 2.1 }],
//         Temperature_FR: [{ value: 2.1 }, { value: 5.2 }, { value: 5.2 }],
//     },
// };
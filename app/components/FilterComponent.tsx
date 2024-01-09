import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FilterComponentProps {
    onApplyFilters: (filters: any) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onApplyFilters }) => {
    const [selectedSortOrder, setSelectedSortOrder] = useState<string>('asc');
    const [selectedPageSize, setSelectedPageSize] = useState<string>('5');

    const applyFilters = async () => {
        try {
            // Retrieve user profile data from AsyncStorage
            const userProfileString = await AsyncStorage.getItem('user_profile');
            if (userProfileString) {
                const userProfile = JSON.parse(userProfileString);

                // Extract user_id from the user profile
                const user_id = userProfile.id;

                // Construct the filters
                const filters = {
                    _sort: 'name', // Default to 'name'
                    _order: selectedSortOrder,
                    _limit: selectedPageSize,
                    user_id, // Include user_id filter
                };

                // Apply filters
                onApplyFilters(filters);
            }
        } catch (error) {
            console.error('Error retrieving user profile:', error);
        }
    };


    useEffect(() => {
        // Apply default filters on component mount
        applyFilters();
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleSortOrderChange = (itemValue: string) => {
        setSelectedSortOrder(itemValue);
    };

    const handlePageSizeChange = (itemValue: string) => {
        setSelectedPageSize(itemValue);
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue="name" // Set to 'name' as the default sort field
                enabled={false} // Disable user interaction with the picker
                style={styles.picker}
            >
                <Picker.Item label="Sort By Name" value="name" />
                {/* You can add other field options if needed */}
            </Picker>
            <Picker
                selectedValue={selectedSortOrder}
                onValueChange={handleSortOrderChange}
                style={styles.picker}
            >
                <Picker.Item label="Ascending" value="asc" />
                <Picker.Item label="Descending" value="desc" />
            </Picker>
            <Picker
                selectedValue={selectedPageSize}
                onValueChange={handlePageSizeChange}
                style={styles.picker}
            >
                <Picker.Item label="5" value="5" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="50" value="50" />
                <Picker.Item label="100" value="100" />
                {/* Add other page size options as needed */}
            </Picker>
            <TouchableOpacity onPress={applyFilters}>
                <FontAwesome name="check" size={24} color="green" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        marginBottom: 10,
        gap: 20,
    },
    picker: {
        flex: 1,
        height: 50,
    },
});

export default FilterComponent;

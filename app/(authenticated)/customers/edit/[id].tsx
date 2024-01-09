import React from 'react'
import { Edit } from '@refinenative/react-native-paper'
import { TextInput, Text, useTheme } from 'react-native-paper'
import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from '@refinedev/core';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
// import {Picker} from '@react-native-picker/picker';

const CustomerEdit = () => {

    const theme = useTheme();

    const {
        refineCore: { queryResult },
        saveButtonProps,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    const customers = queryResult?.data?.data;

    return (
        <Edit
            saveButtonProps={saveButtonProps}
        >
            <View>
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.name && <Text style={{ color: 'red' }}>{errors.name.message as string}</Text>}
            </View>
            <View>
                <Controller
                    control={control}
                    name="phone"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message as string}</Text>}

            </View>
            <View>
                <Controller
                    control={control}
                    name="address"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.address && <Text style={{ color: 'red' }}>{errors.address.message as string}</Text>}

            </View>
            <View>
                <Controller
                    control={control}
                    name="city"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.city && <Text style={{ color: 'red' }}>{errors.city.message as string}</Text>}

            </View>
          
            <View>
                <Controller
                    control={control}
                    name="status"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.status && <Text style={{ color: 'red' }}>{errors.status.message as string}</Text>}
            </View>

            <View>
                <Controller
                    control={control}
                    name="createdAt"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.createdAt && <Text style={{ color: 'red' }}>{errors.createdAt.message as string}</Text>}
            </View>

        </Edit>
    )
}

export default CustomerEdit
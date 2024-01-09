import React from "react";
import {
    useSelect,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from 'react-hook-form';
import { View } from "react-native";
// import { Picker } from '@react-native-picker/picker';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { Create } from "@refinenative/react-native-paper";

export const CustomerCreate = () => {
    const theme = useTheme()
    const {
        refineCore: { onFinish },
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <Create
            saveButtonProps={{ onPress: handleSubmit(onFinish) }}
        >
            <View>
                <Controller
                    control={control}
                    name="Name"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="flat"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.title && <Text style={{ color: 'red' }}>{errors.title.message as string}</Text>}

                <Controller
                    control={control}
                    name="Phone"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="flat"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            numberOfLines={5}
                        />
                    )}
                />
                {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message as string}</Text>}

                <Controller
                    control={control}
                    name="City"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="flat"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            numberOfLines={5}
                        />
                    )}
                />
                {errors.city && <Text style={{ color: 'red' }}>{errors.city.message as string}</Text>}

                <Controller
                    control={control}
                    name="Address"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="flat"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            multiline
                            numberOfLines={5}
                        />
                    )}
                />
                {errors.address && <Text style={{ color: 'red' }}>{errors.address.message as string}</Text>}
            </View>
        </Create>
    );
};

export default CustomerCreate;
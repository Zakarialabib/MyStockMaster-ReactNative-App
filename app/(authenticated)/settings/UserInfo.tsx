import { Text, View, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../utils/AuthUtils';
import color from '../../utils/color';
import { deleteValue } from '../../utils/SecureStore';
import { USER_TOKEN_KEY } from '../../utils/config';
import CustomInput from "../../components/CustomInput";

const UserInfo = ({ navigation: any }) => {
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
	});

	const removeData = () => {
		deleteValue(USER_TOKEN_KEY);
		// navigation.replace("Login");
	}

	useEffect(() => {
		const fetchData = async () => {
			const result = await getUserData()
			if (result.error === 1) {
				removeData();
			}
			if (result) {
				setUserData({
					name: result.name,
					email: result.email,
					phone: result.phone,
					address: result.address,
				});
			}
		};

		fetchData();
		console.log("Fetch data");
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.topSection}>
				<View style={styles.userImageContainer}>
					<Image source={require("../../../assets/logo.png")} style={styles.userImage} />
				</View>
				<Text style={styles.userName}>{userData.name}</Text>
			</View>
			<View style={styles.bottomSection}>
				<Text style={styles.textDetails}>Email</Text>
				<CustomInput style={styles.input} value={userData.email} isDisabled={true} />

			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	topSection: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.primaryColor,
	},
	bottomSection: {
		flex: 7,
		padding: 20,
		backgroundColor: 'white',
	},
	userImageContainer: {
		marginBottom: 10,
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: color.white,
		marginTop: 10
	},
	textRole: {
		fontSize: 14,
		color: color.white,
		marginTop: 5,
	},
	input: {
		paddingHorizontal: 10,
		borderRadius: 10,
		marginBottom: 5
	},
	textDetails: {
		marginBottom: 10,
	},
	buttonCustom: {
		marginTop: 30,
		color: 'red',
	}
});

export default UserInfo;

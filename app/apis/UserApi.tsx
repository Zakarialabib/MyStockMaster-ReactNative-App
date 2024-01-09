import { URL_USER_INFO } from "../utils/config";
import { createFetch, method } from "./CustomFetch";



// //Hàm này chưa hoàn thiện
// export const updateUserProfile = async (newData) => {
// 	try {
// 		const token = await getValue(USER_TOKEN_KEY);
// 		if (token) {
// 			const response = await fetch("https://sgu.dy.id.vn/api/v1/update-user-profile", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: `Bearer ${token}`,
// 				},
// 				body: JSON.stringify(newData),
// 			});

// 			if (response.ok) {
// 				const result = await response.json();
// 				return result;
// 			} else {
// 				console.error("Lỗi khi gọi API để cập nhật hồ sơ:", response.statusText);
// 				return null;
// 			}
// 		}
// 	} catch (error) {
// 		console.error("Lỗi khi cập nhật hồ sơ:", error);
// 		return null;
// 	}
// };

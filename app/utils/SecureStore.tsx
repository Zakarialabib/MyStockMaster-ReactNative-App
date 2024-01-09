import * as SecureStore from 'expo-secure-store';

export async function save(key, value) {
  return SecureStore.setItemAsync(key, value)
    .then((res) => true)
    .catch((error) => {
        console.error("Lỗi khi lưu giá trị vào SecureStore: ", error);
			  return false;
    })
}

export async function getValue(key) {
  return SecureStore.getItemAsync(key)
    .then(res => res)
    .catch(err => {
      console.error('Lỗi khi lấy giá trị từ SecureStore: ', err);
      return null;
    });
}

export async function deleteValue(key){
  return SecureStore.deleteItemAsync(key)
    .then(res => true)
    .catch(err => {
      console.error("Lỗi khi xóa giá trị key: " + err);
      return false;
  })
}
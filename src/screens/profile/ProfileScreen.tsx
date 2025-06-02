import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../constants/colors';
import {useUserStore} from '../../store/userStore';
import {getProfileImage} from '../../utils/helpers';
import {CustomInput} from '../../components/inputs/CustomInput';

import {useMutation} from '@tanstack/react-query';
import {_styles} from '../../constants/styles';
import {useAuthStore} from '../../store/authStore';
import api from '../../api';

const ProfileScreen = () => {
  const {user, setUser} = useUserStore();
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [image, setImage] = useState(user?.profileImage);
  const {clearUser} = useUserStore();
  const {clearToken} = useAuthStore();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: async () => {
      const response = await api.patch(`/user/update`, {name, username});
      return response.data;
    },
    onSuccess(data, variables, context) {
      setUser({...user, name, username});
      Alert.alert('profile updated!');
    },
    onError(error, variables, context) {
      Alert.alert(error.message || 'Unable to update profile');
    },
  });

  const updateProfile = () => {
    if (!name?.trim()) return;
    if (!username?.trim()) return;

    mutateAsync();
  };

  const logOut = () => {
    clearToken();
    clearUser();
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <ScrollView>
        <View style={{gap: 20, paddingHorizontal: 20, marginTop: 20}}>
          <View style={{}}>
            <Image
              style={{height: 120, width: 120, borderRadius: 100}}
              source={getProfileImage(user.profileImage.url)}
            />
          </View>
          <CustomInput
            defaultValue={name}
            label="Name"
            onChangeText={setName}
          />
          <CustomInput
            defaultValue={username}
            label="Username"
            onChangeText={setUsername}
          />
          <CustomInput
            defaultValue={email}
            label="Email"
            onChangeText={setUsername}
            disabled
          />
          <TouchableOpacity
            style={styles.logout}
            onPress={logOut}
            // disabled={isPending}
          >
            <></>
            <Text style={{}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{padding: 20}}>
        <Button
          title="Update profile"
          onPress={updateProfile}
          // disabled={isPending}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  logout: {
    marginTop: 20,
    ..._styles.flexRow,
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: theme.border,
  },
});

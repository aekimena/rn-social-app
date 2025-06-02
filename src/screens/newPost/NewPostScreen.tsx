import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../constants/colors';
import {CustomInput} from '../../components/inputs/CustomInput';
import {_styles} from '../../constants/styles';
import {Icon} from '../../components/Icon';
import ImagePicker from 'react-native-image-crop-picker';
import {useMutation} from '@tanstack/react-query';
import api from '../../api';
import {useNavigation} from '@react-navigation/native';

const NewPostScreen = () => {
  const [caption, setCaption] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const navigation = useNavigation();

  const {isPending, mutateAsync} = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`/create`, data);
      return response.data;
    },
    onError(error, variables, context) {
      Alert.alert('Create post Error!');
    },
    onSuccess(data, variables, context) {
      Alert.alert('New post created!!');
      navigation.goBack();
    },
  });

  const onPressAdd = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 400,
      compressImageQuality: 1,
    }).then(selectedImage => {
      console.log(selectedImage.path);

      setSelectedImages([...selectedImages, selectedImage.path]);
    });
  };

  const createPost = () => {
    if (selectedImages.length === 0) return;
    const formData = new FormData();
    formData.append('caption', JSON.stringify(caption));
    selectedImages.forEach((i, index) => {
      const fileExtension = i.split('.').pop(); // e.g., jpg, png
      formData.append('images', {
        uri: i,
        name: `image_${index}.${fileExtension}`,
        type: `image/${fileExtension}`, // fallback, you could also detect mime with alib
      });
    });

    mutateAsync(formData);
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <View style={{paddingHorizontal: 20, marginTop: 20, gap: 20}}>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{..._styles.flexRow, gap: 15}}>
              {selectedImages.map((image, index) => (
                <Image
                  source={{uri: image}}
                  style={{height: 160, width: 160, borderRadius: 12}}
                  key={index}
                />
              ))}
              <Pressable
                onPress={onPressAdd}
                style={styles.add}
                disabled={selectedImages.length === 3}>
                <Icon name="add-outline" color={theme.textPrimary} size={40} />
              </Pressable>
            </View>
          </ScrollView>
        </View>
        <CustomInput
          onChangeText={setCaption}
          placeholder="Caption..."
          isMultiple
        />
      </View>
      <View
        style={{position: 'absolute', bottom: 0, width: '100%', padding: 20}}>
        <Button title="Add Post" onPress={createPost} />
      </View>
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  add: {
    height: 160,
    width: 90,
    borderWidth: 0.5,
    borderColor: theme.border,
    borderRadius: 20,
    ..._styles.allCenter,
  },
});

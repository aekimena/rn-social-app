import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Post} from '../../types';
import {_styles} from '../../constants/styles';
import {formatDateTime, getProfileImage} from '../../utils/helpers';
import {theme} from '../../constants/colors';
import {FollowButton} from '../buttons/FollowButton';
const screenWidth = Dimensions.get('window').width;

export const PostItem = ({item}: {item: Post}) => {
  return (
    <View style={{gap: 10}}>
      <View style={{..._styles.flexRow, gap: 10, paddingHorizontal: 20}}>
        <View style={{flex: 1, ..._styles.flexRow, gap: 10}}>
          <Image
            source={getProfileImage(
              item.owner.profileImage ? item.owner.profileImage.url : '',
            )}
            style={{height: 60, width: 60, borderRadius: 50, borderWidth: 0}}
          />
          <View>
            <Text>{item.owner.name}</Text>
            <Text style={{color: theme.textSecondary}}>
              @{item.owner.username}
            </Text>
          </View>
        </View>

        <FollowButton user={item.owner} />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text numberOfLines={3}>{item.caption}</Text>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {item.images.map((image, index) => (
            <Image
              key={index}
              source={{
                uri: image.url,
              }}
              style={{width: screenWidth, height: screenWidth}}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 10, color: theme.textSecondary}}>
          Created at {formatDateTime(item.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

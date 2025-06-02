import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {User} from '../../types';
import {getProfileImage} from '../../utils/helpers';

import {theme} from '../../constants/colors';
import {_styles} from '../../constants/styles';
import {FollowButton} from '../buttons/FollowButton';

export const UserBlock = ({item}: {item: User}) => {
  return (
    <View style={[styles.flex, styles.container]}>
      <View style={{flex: 1, ...styles.flex}}>
        <Image
          source={getProfileImage(
            item.profileImage ? item.profileImage.url : '',
          )}
          style={{height: 70, width: 70, borderRadius: 70}}
        />
        <View>
          <Text style={{}}>{item.name}</Text>
          <Text style={{color: theme.textSecondary}}>@{item.username}</Text>
        </View>
      </View>
      <FollowButton user={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    ..._styles.flexRow,
    gap: 10,
  },

  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

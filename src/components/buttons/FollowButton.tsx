import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../../constants/colors';
import {User} from '../../types';
import {useFollowStore} from '../../store/follow.store';
import {useMutation} from '@tanstack/react-query';
import api from '../../api';

export const FollowButton = ({user}: {user: User}) => {
  const {followed, unfollowed, toggleFollow} = useFollowStore();

  const isUserFollowed = () => {
    if (followed.has(user._id)) return true;
    if (unfollowed.has(user._id)) return false;
    return user.isFollowing || false;
  };

  const {mutateAsync, isPending} = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/users/${user._id}/follow`, {});
      return response.data;
    },
  });

  const onPressFollow = () => {
    toggleFollow(user._id, isUserFollowed());
    mutateAsync();
  };

  return (
    <Pressable
      style={styles.followBtn}
      onPress={onPressFollow}
      disabled={isPending}>
      <Text style={{color: theme.white}}>
        {isUserFollowed() === true ? 'Following' : 'Follow'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  followBtn: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: theme.primary,
  },
});

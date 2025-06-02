import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {theme} from '../../constants/colors';
import {PostItem} from '../../components/posts/PostItem';
import api from '../../api';
import {useQuery} from '@tanstack/react-query';
import {_styles} from '../../constants/styles';

const FollowingScreen = () => {
  const {data, isLoading, isLoadingError, refetch, isRefetching} = useQuery({
    queryKey: ['following-posts'],
    queryFn: async () => {
      const response = await api.get(`/following-posts`);
      return response.data;
    },
  });

  const posts = useMemo(() => {
    if (data && Array.isArray(data.data)) {
      return data.data || [];
    }
    return [];
  }, [data]);
  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      {isLoading && (
        <View style={{flex: 1, ..._styles.allCenter}}>
          <Text>Loading...</Text>
        </View>
      )}
      {data &&
        Array.isArray(data.data) &&
        data.data.length > 0 &&
        !isLoading && (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            data={posts}
            contentContainerStyle={{gap: 20, marginTop: 20}}
            keyExtractor={item => item._id}
            renderItem={({item}) => <PostItem item={item} />}
          />
        )}
      {data && Array.isArray(data.data) && data.data.length === 0 && (
        <View style={{flex: 1, ..._styles.allCenter}}>
          <Text>You haven't followed anyone yet.</Text>
        </View>
      )}
    </View>
  );
};

export default FollowingScreen;

const styles = StyleSheet.create({});

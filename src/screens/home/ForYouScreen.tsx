import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {theme} from '../../constants/colors';
import {PostItem} from '../../components/posts/PostItem';
import {useQuery} from '@tanstack/react-query';
import api from '../../api';
import {_styles} from '../../constants/styles';

const ForYouScreen = () => {
  const {data, isLoading, isLoadingError, refetch, isRefetching} = useQuery({
    queryKey: ['for-you-posts'],
    queryFn: async () => {
      const response = await api.get(`/posts`);
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
      {data && Array.isArray(data.data) && !isLoading && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          data={posts}
          contentContainerStyle={{gap: 20, marginTop: 20, paddingBottom: 100}}
          keyExtractor={item => item._id}
          renderItem={({item}) => <PostItem item={item} />}
        />
      )}
    </View>
  );
};

export default ForYouScreen;

const styles = StyleSheet.create({});

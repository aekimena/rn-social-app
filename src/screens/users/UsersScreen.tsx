import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {theme} from '../../constants/colors';
import {UserBlock} from '../../components/users/UserBlock';
import {useQuery} from '@tanstack/react-query';
import api from '../../api';
import {_styles} from '../../constants/styles';

const UsersScreen = () => {
  const {data, isLoading, isLoadingError} = useQuery({
    queryKey: ['userss'],
    queryFn: async () => {
      const response = await api.get(`/users`);
      return response.data;
    },
  });

  const users = useMemo(() => {
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
          data={users}
          keyExtractor={item => item._id}
          renderItem={({item}) => <UserBlock item={item} />}
        />
      )}
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({});

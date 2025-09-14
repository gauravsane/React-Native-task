import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { mockData } from './MockData';


export default function LargeListData() {
    
interface Item {
  id: string;
  title: string;
  description: string;
}

  const PAGE_SIZE = 30;
  const [data, setData] = useState(mockData.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);

  const loadMore = () => {
    const nextPage = page + 1;
    const newData = mockData.slice(0, PAGE_SIZE * nextPage);
    setData(newData);
    setPage(nextPage);
  };

  const renderItem = ( { item }: { item: Item }) => (
    <View style={{ padding: 12, borderBottomWidth: 1 }}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      getItemLayout={(data, index) => ({
        length: 60, 
        offset: 60 * index,
        index,
      })}
      windowSize={10}
      initialNumToRender={20}
      maxToRenderPerBatch={30}
      ListFooterComponent={
        data.length < mockData.length ? (
          <ActivityIndicator size="small" color="gray" />
        ) : null
      }
    />
  )
}
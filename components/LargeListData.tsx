import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { mockData } from './MockData';


export default function LargeListData() {

//defines what properties and its types
interface Item {
  id: string;
  title: string;
  description: string;
}
  //Define how much data is loaded each page
  const PAGE_SIZE = 30;
  const [data, setData] = useState(mockData.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);

  //Load more function when user reach end of the screen it calls and load next page 
  const loadMore = () => {
    const nextPage = page + 1;
    const newData = mockData.slice(0, PAGE_SIZE * nextPage);
    setData(newData);
    setPage(nextPage);
  };

  //To Display items in each row in Flatlist
  const renderItem = ( { item }: { item: Item }) => (
    <View style={{ padding: 12, borderBottomWidth: 1 }}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}   //Unique Each Entry
      renderItem={renderItem} //Render item from renderItem function
      onEndReached={loadMore} 
      onEndReachedThreshold={0.5}  //how close to the bottom 50%
      getItemLayout={(data, index) => ({
        length: 60, 
        offset: 60 * index,
        index,
      })}  //Tell size of each row so its skip measuring
      windowSize={10} //items to render at ones
      initialNumToRender={20} //first load
      maxToRenderPerBatch={30} //max items render per batch
      ListFooterComponent={
        data.length < mockData.length ? (
          <ActivityIndicator size="small" color="gray" />
        ) : null
      } //shows bottom of list loader
    />
  )
}
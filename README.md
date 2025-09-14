# 1. Optimized Large List
- Generate 5000 Mock Data in MockData.tsx and then used it in LargeListData.tsx file using Flatlist

# 2. Global State (Cart System)
- First Setup Redux in components/Redux folder store and cart configuration in Store.tsx and CartSlice.tsx
- Get Product list in ProductList.tsx and display the Cart items in CartScreen.tsx

# 3. Offline Support
- used Netinfo package to check interent connection based on that get and stored the data in asyncstorage and display it in LoadOfflineData.tsx

# 4. Secure Token Storage
- used react-native-keychain package for secure data stored and get it when app restart
- Get secure data in App.tsx page and then pass it to HomeScreen.tsx then then SecureToken.tsx to display it.

# 5. Deep Linking
- use linking func in App.tsx to open specific screen when receive any link start with myapp://
- present in UserDetailsScreen.tsx file

# 6. Code Review (Small Exercise)
- <FlatList data={data} renderItem={(item) => <Text> {item.title}</Text>}/>
- Ans: You have to destructure the item to render it in each rows without it you get undefined.

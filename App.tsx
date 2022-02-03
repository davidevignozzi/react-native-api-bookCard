import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Card from './UI/card';
import  palette  from './style/palette';
import typography from './style/typography';

import { useEffect, useState } from 'react';

export default function App() {
    const [books, setBooks] = useState([]);
    // const [apiKey, setApiKey] = useState("AIzaSyCkf4kyqfsOvHXSc7Jhr-9Z8Z-w1i_aGPo");
    const [loading, setLoading] = useState(false);
    const [title, setTtitle] = useState([]);

    // fetch data
    useEffect(() => {
      fetch('https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=')
        .then((response) => response.json())
        .then((json) => {
          setBooks(json.items);
          setTtitle(json.items[0].volumeInfo.title);
        })
        .catch((error) => alert(error))
        .finally(() => setLoading(false))
    });

  return (
    <SafeAreaView style={styles.container}>
      {

        loading ? (
          <ActivityIndicator />
        ) :
        
        <Text>{title}</Text>
        
        // <FlatList data={books} keyExtractor={({ id }, index) => id}
      
        // renderItem={({item}) => (
        //   <Text>{item.volumeInfo.title}</Text>
        // )}

        // />
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Card from './UI/card';
import  palette  from './style/palette';
import typography from './style/typography';

import { useEffect, useState } from 'react';

export default function App() {
    const [books, setBooks] = useState([]);
    // const [apiKey, setApiKey] = useState("AIzaSyCkf4kyqfsOvHXSc7Jhr-9Z8Z-w1i_aGPo");
    const [loading, setLoading] = useState(false);

    const URL = 'https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=';

    // fetch data
    // useEffect(() => {
    //   fetch(URL)
    //     .then((response) => response.json())
    //     .then((json) => {
    //       setBooks(json.items);
    //     })
    //     .catch((error) => alert(error))
    //     .finally(() => setLoading(false))
    // });
    const getBooks = async () => {
      try {

        const response = await fetch(
          URL
        );
        const json = await response.json();
        setBooks(json.items);
        setLoading(false);

      } catch (error) {

        alert(error);

      }
    }

    useEffect(() => {
      getBooks();
    }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      {
        // if is loading show loading indicator
        loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={books}
            keyExtractor={({ item }, index) => item.id}
            renderItem={({ item }) => (
              <Text>{item}</Text>
            )}
          />
          // <Text>{books}</Text>
        )
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

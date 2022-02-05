import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import typography from '../style/typography';


const Card = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const [apiKey, setApiKey] = useState("AIzaSyALTpmQSxWQA1g0La-42nD1L7CqhFbK4TM");
    const URL = 'https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=';

    // CALL API
    const getBooks = async () => {
        try {
        const response = await fetch(URL + apiKey);
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

    const style = StyleSheet.create({
        cardContainer:{
            width: 300,
            borderWidth: 2,
            borderColor: 'black',
            justifyContent: 'center'
        },
        imageContainer:{
            justifyContent: 'center',
            alignItems: 'center'
        },
        cardImage:{
            width: 100,
            height: 200
        },
        infoCardContainer:{
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardTitle:{
            width: 200,
            fontSize: 20,
            fontWeight: '600',
        },
        cardAuthor:{
            width: 180,
            fontSize: 18,
            fontWeight: '400'
        },
    })

    return(
        // if is loading show loading indicator
        loading ? (
            <ActivityIndicator />
        ) : (
        <FlatList
        data={books}
        key={books.id}
        renderItem={({ item }) => (
            <View style={style.cardContainer}>
                {/* IMG */}
                <View style={style.imageContainer}>
                    <Image style={style.cardImage}
                    source={{
                        uri: item.volumeInfo.imageLinks.thumbnail,
                    }}
                    />
                </View>
                <View style={style.infoCardContainer}>
                    {/* TITLE */}
                    <Text style={[style.cardTitle]}>{item.volumeInfo.title}</Text>
                    {/* AUTHORS */}
                    <Text style={style.cardAuthor}>{item.volumeInfo.authors}</Text>
                </View>
            </View>
        )}
        />
    ));   
}

export default Card;
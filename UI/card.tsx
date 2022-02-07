import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import typography from '../style/typography';


const Card = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
  

    // GOOGLE BOOK API
    const [apiKey, setApiKey] = useState("AIzaSyALTpmQSxWQA1g0La-42nD1L7CqhFbK4TM");
    const URL = 'https://www.googleapis.com/books/v1/volumes?q=javascript=free-ebooks&key=';
    
    // TODO NEW API { find book api with categories + best seller }

    // ** CALL API
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

    // ** STYLE
    const style = StyleSheet.create({
        list:{
            height: 350,
        },
        cardContainer:{
            position: 'relative',
            width: 170,
            height: 320,
            backgroundColor: 'rgba(250, 250, 250, 0.4)',
            shadowColor: "#000",
            shadowOffset: {
                width: 2,
                height: 10,
            },
            shadowOpacity: 0.40,
            shadowRadius: 10.32,
            elevation: 18,
            borderRadius: 30,
            justifyContent: 'center',
            marginHorizontal: 16,
        },
        imageContainer:{
            alignItems: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 1,
                height: 8,
            },
            shadowOpacity: 0.62,
            shadowRadius: 10.32,
        },
        cardImage:{
            width: 100,
            height: 150,
        },
        infoCardContainer:{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
        },
        cardTitle:{
            width: 130,
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 7,
        },
        cardAuthor:{
            width: 130,
            fontSize: 18,
            fontWeight: '400'
        },
    })

    return(
        // if is loading show loading indicator
        loading ? (
            <ActivityIndicator />
        ) : (
            <View style={style.list}>
                <FlatList
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
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
                                <Text style={style.cardAuthor}>By {item.volumeInfo.authors}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
            
        )
    );   
}

export default Card;
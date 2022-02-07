import {  SafeAreaView, StyleSheet, } from 'react-native';
import Card from './UI/card';
import  palette  from './style/palette';
import typography from './style/typography';

import { useEffect, useState } from 'react';

export default function App() {
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Card />
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

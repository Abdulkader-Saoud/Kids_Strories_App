import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';

export default function Paragraph({headline, text }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/storryteller.png')} style={styles.image} />
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '95%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
  }
});

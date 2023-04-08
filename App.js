import React ,{useState,useEffect} from 'react';
import { View, Text, StyleSheet ,ScrollView ,ActivityIndicator ,TouchableOpacity } from 'react-native';
import { useFonts, Lalezar_400Regular } from '@expo-google-fonts/lalezar';
import Paragraph from './Components/Paragraph';
import axios
 from 'axios';
import { MODEL_ENGINE,OPENAI_API_KEY } from './bc';
const adj = ["الاخلاق الحميدة", "مساعدة الغير","عدم السرقة" , "الاجتهاد", "بر الوالدين"]

//=============================================================
//======================= LIKE + SUB !!!=======================
// =============================================================

export default function MainPage() {
  const [fontsLoaded] = useFonts({ Lalezar_400Regular });
  const [story, setStory] = useState('');
  const [headline,setHeadline] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  async function generateStory() {
    setIsLoading(true);
    const prompt = `${adj[Math.floor(Math.random() * adj.length)]} قصةاطفال فقط باللغة العربية مع العنوان في البداية تحث على `;
    const temperature = 0.7;
    const maxTokens = 2056;
    try {
      console.log('hi 1');
      const response = await axios.post(
        'https://api.openai.com/v1/engines/' + MODEL_ENGINE + '/completions',
        {
          prompt: prompt,
          max_tokens: maxTokens,
          temperature: temperature
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + OPENAI_API_KEY,
          },
        }
      );
      setStory(response.data.choices[0].text);
      let i = 0;
      let newhead = '  ';
      while (newhead.length < 5 && i < 10){   
      console.log('hi 3');

        newhead = response.data.choices[0].text.split('\n')[i];
        i++;
      }
      console.log('hi 2');
      setHeadline(newhead);
      setIsLoading(false);

    } catch (err) {
      console.log(err);
      setIsLoading(false);

    }
  }
  useEffect(() => {
    
    generateStory();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <View style={styles.container}>
      {isLoading ?(
          <ActivityIndicator  style={styles.spin} size="large" color="#0000ff" />
        )
        :(
      <ScrollView>
        <View>
          <Paragraph
            headline={headline}
            text={story}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={generateStory}>
          <Text>قصة جديدة</Text>
        </TouchableOpacity>
      </ScrollView>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F2E8CF',
    overflow: 'scroll'
  },
  spin: {
    width: 70,
    height: 70,
    marginTop: 30
  },
  headline: {
    fontFamily: 'Lalezar_400Regular',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 20,
    color: '#386641',
  },
  button: {
    width: 150,
    borderColor: "black",
    borderWidth: 2,
    textAlign: "center"
  }
});
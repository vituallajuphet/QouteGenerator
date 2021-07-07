import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Button} from 'react-native';
import axios from 'axios';

interface IQoute {
  author?: string;
  id?: number;
  quote?: string;
}

const App: React.FC = () => {
  const [qoute, setQoute] = useState<IQoute>({});

  const options: any = {
    method: 'GET',
    url: 'https://quoteai.p.rapidapi.com/ai-quotes/0',
    headers: {
      'x-rapidapi-key': '2b8224864dmsh49e3ac67e0a89fep111492jsna12f052e30d8',
      'x-rapidapi-host': 'quoteai.p.rapidapi.com',
    },
  };

  const refresh = () => {
    axios.request(options).then(res => setQoute(res.data));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        <Text style={styles.author}>{qoute.author}</Text>
        <Text style={styles.qoute}>"{qoute.quote}"</Text>
      </View>
      <Button onPress={refresh} title="Reload" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  author: {
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  qoute: {
    fontStyle: 'italic',
    fontSize: 15,
  },
});

export default App;

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

interface IQoute {
  author?: string;
  id?: number;
  quote?: string;
}

const App: React.FC = () => {
  const [qoute, setQoute] = useState<IQoute>({});
  const [loading, setLoading] = useState(true);

  const options: any = {
    method: 'GET',
    url: 'https://quoteai.p.rapidapi.com/ai-quotes/0',
    headers: {
      'x-rapidapi-key': '2b8224864dmsh49e3ac67e0a89fep111492jsna12f052e30d8',
      'x-rapidapi-host': 'quoteai.p.rapidapi.com',
    },
  };

  const refresh = () => {
    setLoading(true);

    axios.request(options).then(res => {
      setLoading(false);
      setQoute(res.data);
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        {loading && <Text>Loading</Text>}
        <Text style={styles.author}>{qoute.author}</Text>
        <Text style={styles.qoute}>"{qoute.quote}"</Text>
        <TouchableOpacity style={styles.button} onPress={refresh}>
          <Text style={styles.btnText}>Reload</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    backgroundColor: 'blue',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 5,
    marginTop: 15,
  },
  btnText: {
    color: 'white',
  },
});

export default App;

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
export const Font1 = { fontFamily: 'RobotoMono-Bold' }
export const Font2 = { fontFamily: 'RobotoCondensed-Bold' }
export const Font3 = { fontFamily: 'SourceCodePro-Bold' }


const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [color, setColor] = useState('#00ff00');
  const [backgroundColor, setBackgroundColor] = useState('#000000')
  const [size, setSize] =useState(360)
  const [settingsPage, setSettingsPage] = useState(false);
  const [myFont, setFont] = useState(Font1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60000 ms = 1 минута

    return () => clearInterval(timer);
  }, []);

  const formatHour = (date: Date) => {
    return String(date.getHours()).padStart(2, '0');
  };

  const formatMinute = (date: Date) => {
    return String(date.getMinutes()).padStart(2, '0');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: backgroundColor }]}>
      <StatusBar hidden />
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        {settingsPage ? (
          <View>
            <Text style={[styles.lable, { color: color }]}>Text Color:</Text>
            <TextInput
              value={color}
              onChangeText={setColor}
              style={[styles.inputBox]}
            />
            <Text style={[styles.lable, { color: color, marginTop: 20  }]}>Background Color:</Text>
            <TextInput
              value={backgroundColor}
              onChangeText={setBackgroundColor}
              style={[styles.inputBox]}
            />
            <Text style={[styles.lable, { color: color, marginTop: 20  }]}>Font Size:</Text>
            <TextInput
              value={size.toString()}
              onChangeText={(t)=>setSize(parseInt(t,10))}
              style={[styles.inputBox]}
            />
            <Text style={[styles.lable, { color: color, marginTop: 20 }]}>
              Font Family:
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
              <TouchableOpacity onPress={() => setFont(Font1)}>
                <Text style={[
                  styles.button,
                  { color: color },
                  myFont.fontFamily === Font1.fontFamily ? { textDecorationLine: 'underline' } : null
                ]}>
                  Font1
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setFont(Font2)}>
                <Text style={[
                  styles.button,
                  { color: color, marginTop: 20  },
                  myFont.fontFamily === Font2.fontFamily ? { textDecorationLine: 'underline' } : null
                ]}>
                  Font2
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setFont(Font3)}>
                <Text style={[
                  styles.button,
                  { color: color },
                  myFont.fontFamily === Font3.fontFamily ? { textDecorationLine: 'underline' } : null
                ]}>
                  Font3
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setSettingsPage(false)}>
              <Text style={[styles.lable, styles.button, { color: color }]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setSettingsPage(true)} style={{ flex: 1, justifyContent: "center", alignItems: "center", width: '100%', }}>
            <Text style={[styles.clockText, { color: color, fontSize: size, ...myFont }]}>{formatHour(currentTime)}</Text>
            <Text style={[styles.clockText, { color: color, fontSize: size, ...myFont }]}>{formatMinute(currentTime)}</Text>
          </TouchableOpacity>
        )
        }
      </View >
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {
    // ...defaultFont,
    width: '100%',
    textAlign: 'center',
    padding: 0,
    margin: 0,
    borderColor: "#fff",
    borderWidth: 0
  },
  lable: {
    fontSize: 20
  },
  inputBox: {
    fontSize: 15,
    padding: 3,
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#fff',
    color: '#000',
    backgroundColor: "#3d3d3d"
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: "#3d3d3d",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    textAlign: 'center'
  }
});

export default App;
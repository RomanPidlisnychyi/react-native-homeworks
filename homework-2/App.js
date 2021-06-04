import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

const initialState = {
  login: '',
  email: '',
  password: '',
};

const inputNames = {
  login: 'LOGIN',
  email: 'EMAIL',
  password: 'PASSWORD',
};

export default function App() {
  const [dimension, setDimension] = useState(Dimensions.get('window').width);
  const [state, setState] = useState(initialState);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [inFocus, setInFocus] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    const changeWidth = () => {
      const width = Dimensions.get('window').width;

      setDimension(width);
    };

    Dimensions.addEventListener('change', changeWidth);

    return () => {
      Dimensions.removeEventListener('change', changeWidth);
    };
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => setIsKeyboard(true);
  const _keyboardDidHide = () => setIsKeyboard(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require('./assets/images/Photo.jpg')}
        >
          <View style={styles.form}>
            <View style={styles.formImage}>
              <TouchableOpacity activeOpacity={0.8} style={styles.formImgBtn}>
                <Text style={styles.formImgBtnTitle}>+</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                ...styles.formTitle,
                marginTop: isKeyboard ? 60 : 92,
                marginBottom: isKeyboard ? 8 : 16,
              }}
            >
              Регистрация
            </Text>
            <TextInput
              placeholder="Логин"
              style={{
                ...styles.input,
                width: dimension - 16 * 2,
                borderColor:
                  inFocus === inputNames.login ? '#FF6C00' : '#E8E8E8',
              }}
              onFocus={() => setInFocus(inputNames.login)}
              onBlur={() => setInFocus(null)}
              value={state.login}
              onChangeText={value => setState({ ...state, login: value })}
            />
            <TextInput
              placeholder="Адрес электронной почты"
              style={{
                ...styles.input,
                width: dimension - 16 * 2,
                borderColor:
                  inFocus === inputNames.email ? '#FF6C00' : '#E8E8E8',
              }}
              onFocus={() => setInFocus(inputNames.email)}
              onBlur={() => setInFocus(null)}
              value={state.email}
              onChangeText={value => setState({ ...state, email: value })}
            />
            <View style={styles.passwordInputWrap}>
              <TextInput
                placeholder="Пароль"
                style={{
                  ...styles.input,
                  width: dimension - 16 * 2,
                  borderColor:
                    inFocus === inputNames.password ? '#FF6C00' : '#E8E8E8',
                  marginBottom: 43,
                }}
                secureTextEntry={!isShowPassword}
                onFocus={() => setInFocus(inputNames.password)}
                onBlur={() => setInFocus(null)}
                value={state.password}
                onChangeText={value => setState({ ...state, password: value })}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.passwordShowBtn}
                onPress={() => setIsShowPassword(!isShowPassword)}
              >
                <Text style={styles.passwordShowBtnTitle}>
                  {isShowPassword ? 'Скрыть' : 'Показать'}
                </Text>
              </TouchableOpacity>
            </View>
            {!isKeyboard && (
              <View style={styles.controlWrap}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ ...styles.formBtn, width: dimension - 16 * 2 }}
                >
                  <Text style={styles.formBtnTitle}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <Text style={styles.formLink}>Уже есть аккаунт? Войти</Text>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formImage: {
    position: 'absolute',
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  formImgBtn: {
    position: 'absolute',
    right: -12,
    bottom: 18,
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formImgBtnTitle: {
    color: '#FF6C00',
    fontSize: 24,
  },
  formTitle: {
    fontSize: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    backgroundColor: '#F6F6F6',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  passwordInputWrap: {
    position: 'relative',
  },
  passwordShowBtn: {
    position: 'absolute',
    right: 16,
    top: 15,
  },
  controlWrap: {
    alignItems: 'center',
  },
  formBtn: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  formBtnTitle: {
    color: '#fff',
    fontSize: 16,
  },
  formLink: {
    fontSize: 16,
    marginBottom: 40,
  },
});

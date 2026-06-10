import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { auth } from '../firebase/config';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    

    function onSubmit(email, password) {
        if (email === '' || password === '') {
            setLoginError('Debe completar ambos campos');
        } else if (!email.includes('@')) {
            setLoginError('El email debe contener un @');
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then(response => {
                    setLoginError('');
                    props.navigation.navigate('HomeMenu');
                })
                .catch(error => {
                    setLoginError('Credenciales inválidas');
                });
        }
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            props.navigation.navigate('HomeMenu');
        }
    });

    return (
        
        <View style={styles.container}>
            
            <Text style={styles.title}>Log In</Text>

            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='Email:'
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Password:'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            {
                loginError !== '' ?
                    <Text style={styles.error}>{loginError}</Text>
                    :
                    null
            }

            <Pressable style={styles.button} onPress={() => onSubmit(email, password)}>
                <Text style={styles.buttonText}>Entrar a la App</Text>
            </Pressable>

            <Pressable style={styles.registerButton} onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.registerText}>¿No tenés cuenta? Registrate</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        maxWidth: 430,
        minHeight: 520,
        alignSelf: 'center',
        marginTop: 90,
        padding: 35,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },

    title: {
        fontSize: 36,
        fontWeight: '400',
        marginBottom: 45,
        textAlign: 'center',
        color: '#222',
        fontFamily: 'Arial',
    },

    input: {
        backgroundColor: '#f2f2f2',
        borderWidth: 0,
        borderRadius: 10,
        padding: 14,
        marginBottom: 25,
        fontSize: 20,
        color: '#333',
        fontFamily: 'Helvetica',
    },

    error: {
        color: 'red',
        textAlign: 'center',
        fontFamily: 'Helvetica',
        marginBottom: 15,
        fontSize: 14,
    },

    button: {
        backgroundColor: '#06477c',
        padding: 16,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 25,
        width: 220,
        alignSelf: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '400',
        fontFamily: 'Helvetica',
    },

    registerButton: {
        marginTop: 8,
        alignItems: 'center',
    },

    registerText: {
        color: '#333',
        fontSize: 14,
        textDecorationLine: 'underline',
    }
});
export default Login;
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
    
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
    
            {/* 
            <Pressable style={styles.registerButton} onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.registerText}>¿No tenés cuenta? Registrate</Text>
            </Pressable>  
            */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },

    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 14,
    },

    button: {
        backgroundColor: '#222',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 5,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    registerButton: {
        marginTop: 20,
        alignItems: 'center',
    },

    registerText: {
        color: '#222',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
});
export default Login;
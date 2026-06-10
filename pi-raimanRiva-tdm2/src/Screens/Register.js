import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { auth, db } from '../firebase/config';

function Register(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState('');

    function onSubmit(email, password, username) {
        setRegisterError('');

        if (!email.includes('@')) {
            setRegisterError('El email debe contener un @');
        } else if (password.length < 6) {
            setRegisterError('La contraseña debe tener al menos 6 caracteres');
        } else {
            auth.createUserWithEmailAndPassword(email, password)
                .then(response => {
                    db.collection('users').add({
                        email: email,
                        username: username,
                        createdAt: Date.now()
                    })
                })
                .then(() => {
                    return auth.signOut();
                })
                .then(() => {
                    setRegisterError('');
                    props.navigation.navigate('LogIn');
                })

                .catch(error => {
                    setRegisterError('No se pudo crear el usuario');
                });
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Registro</Text>

            <TextInput
                style={styles.field}
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Username'
                onChangeText={text => setUsername(text)}
                value={username}
            />

            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            {
                registerError !== '' ?
                    <Text style={styles.error}>{registerError}</Text>
                    :
                    null
            }

            <Pressable style={styles.buttonBlue} onPress={() => onSubmit(email, password, username)}>
                <Text style={styles.buttonText}>Registrarme</Text>
            </Pressable>

            <Pressable style={styles.registerButton} onPress={() => props.navigation.navigate('LogIn')}>
                <Text style={styles.registerText}>¿Ya tenés cuenta?</Text>
            </Pressable>
        </View>
    );
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
        fontFamily: 'Helvetica',
    },

    field: {
        backgroundColor: '#f2f2f2',
        borderWidth: 0,
        borderRadius: 10,
        padding: 14,
        marginBottom: 25,
        fontSize: 20,
        color: '#333',
    },

    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 14,
    },

    buttonBlue: {
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

    loginButton: {
        marginTop: 8,
        alignItems: 'center',
    },

    loginText: {
        color: '#333',
        fontSize: 14,
        textDecorationLine: 'underline',
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
        fontFamily: 'Helvetica',
    }
});

export default Register;
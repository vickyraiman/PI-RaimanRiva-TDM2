import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
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
        }else {
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

    field: {
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

    buttonBlue: {
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

    loginButton: {
        marginTop: 20,
        alignItems: 'center',
    },

    loginText: {
        color: '#222',
        fontSize: 15,
        textDecorationLine: 'underline',
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

export default Register;
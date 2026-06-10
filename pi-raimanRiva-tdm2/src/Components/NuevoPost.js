import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { db, auth } from '../firebase/config';

function NuevoPost() {
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    function CrearPost() {
        if (descripcion === '') {
            setError('El post no puede estar vacío');
        } else {
            db.collection('posts').add({
                descripcion: descripcion,
                email: auth.currentUser.email,
                createdAt: Date.now(),
                likes: []
            })
            .then(() => {
                setDescripcion('');
                setError('');
            })
            .catch(error => console.log(error));
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Crear nuevo post</Text>

                <TextInput 
                    style={styles.input}
                    keyboardType='default'
                    placeholder='¿Qué estás pensando?'
                    placeholderTextColor='#999'
                    value={descripcion}
                    onChangeText={(text) => setDescripcion(text)}
                    multiline={true}
                />

                {
                    error !== '' ?
                    <Text style={styles.error}>{error}</Text>
                    :
                    null
                }

                <Pressable style={styles.button} onPress={() => CrearPost()}>
                    <Text style={styles.buttonText}>Publicar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    card: {
        width: '90%',
        maxWidth: 600,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 12,
        padding: 30,
    },

    title: {
        fontSize: 36,
        fontWeight: '300',
        color: '#222',
        textAlign: 'center',
        marginBottom: 30,
    },

    input: {
        minHeight: 180,
        backgroundColor: '#f2f2f2',
        borderWidth: 0,
        borderRadius: 10,
        padding: 16,
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'top',
        marginBottom: 20,
    },

    error: {
        color: '#d32f2f',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 15,
    },

    button: {
        backgroundColor: '#06477c',
        height: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        alignSelf: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
    },
});

export default NuevoPost;
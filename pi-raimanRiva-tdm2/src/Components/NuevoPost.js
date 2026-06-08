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
        backgroundColor: '#eef1f5',
        padding: 20,
        justifyContent: 'center',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 18,
        textAlign: 'center',
        color: '#222',
    },

    input: {
        minHeight: 120,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        textAlignVertical: 'top',
        marginBottom: 14,
    },

    error: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 12,
    },

    button: {
        backgroundColor: '#2563eb',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NuevoPost;
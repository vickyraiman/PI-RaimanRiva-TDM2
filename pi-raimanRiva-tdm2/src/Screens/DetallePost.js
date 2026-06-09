import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import firebase from "firebase";


function DetallePost(props) {
    const [post, setPost] = useState("");
    const [comentario, setComentario] = useState("");
    const [comentariosOrdenados, setComentariosOrdenados] = useState([]);
    const [error, setError] = useState("");

    const id = props.route.params.id;
    const miEmail = auth.currentUser.email;

    useEffect(() => {
        db.collection('posts').doc(id).onSnapshot(doc => {
            setPost(doc.data());
        });

        db.collection('posts')
            .doc(id)
            .collection('comentarios')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let comentariosArray = [];

                docs.forEach(doc => {
                    comentariosArray.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setComentariosOrdenados(comentariosArray);
            });
    }, []);

    function Comentar() {
        if (comentario === "") {
            setError("El comentario no puede estar vacío");
            return;
        } else {
            db.collection('posts')
                .doc(id)
                .collection('comentarios')
                .add({
                    email: miEmail,
                    texto: comentario,
                    createdAt: Date.now(),
                    likes: []
                })
                .then(() => {
                    setComentario("");
                    setError("");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    let likes = post.likes;

    if (likes === undefined) {
        likes = [];
    }

    let likeado = likes.includes(miEmail);

    function darLike() {
        db.collection('posts').doc(id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(miEmail)
        })
            .then(() => {
                console.log('Post likeado');
            })
            .catch(error => {
                console.log(error)
            });
    }

    function sacarLike() {
        db.collection('posts').doc(id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(miEmail)
        })
            .then(() => {
                console.log('Like sacado');
            })
            .catch(error => {
                console.log(error)
            });
    }

    function darLikeComentario(idComentario) {
        db.collection('posts')
            .doc(id).collection('comentarios').doc(idComentario).update({
                likes: firebase.firestore.FieldValue.arrayUnion(miEmail)
            })
            .then(() => {
                console.log('Comentario likeado');
            })
            .catch(error => {
                console.log(error);
            });
    }

    function sacarLikeComentario(idComentario) {
        db.collection('posts')
            .doc(id).collection('comentarios').doc(idComentario).update({
                likes: firebase.firestore.FieldValue.arrayRemove(miEmail)
            })
            .then(() => {
                console.log('Like de comentario sacado');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.commentBox}>
                <Text style={styles.email}>{post.email}</Text>
                <Text style={styles.descripcion}>{post.descripcion}</Text>
                <Text style={styles.likes}>Likes: {likes.length}</Text>

                {
                    likeado ?
                        <Pressable style={styles.likeButton} onPress={() => sacarLike()}>
                            <Text style={styles.heart}>❤️</Text>
                        </Pressable>
                        :
                        <Pressable style={styles.likeButton} onPress={() => darLike()}>
                            <Text style={styles.heart}>🩶</Text>
                        </Pressable>
                }
            </View>

            <Text style={styles.commentsTitle}>Comentarios</Text>

            <View style={styles.formBox}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Escribí tu comentario...'
                    value={comentario}
                    onChangeText={text => setComentario(text)}
                />

                {
                    error !== "" ?
                        <Text style={styles.error}>{error}</Text>
                        :
                        null
                }

                <Pressable style={styles.button} onPress={() => Comentar()}>
                    <Text style={styles.buttonText}>Comentar</Text>
                </Pressable>
            </View>

            {
                comentariosOrdenados.length > 0 ?
                    <FlatList
                        data={comentariosOrdenados}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            let likesComentario = item.data.likes;

                            if (likesComentario === undefined) {
                                likesComentario = [];
                            }

                            let comentarioLikeado = likesComentario.includes(miEmail);

                            return (
                                <View style={styles.commentBox}>
                                    <Text style={styles.commentEmail}>{item.data.email}</Text>
                                    <Text style={styles.commentText}>{item.data.texto}</Text>

                                    <Text style={styles.likes}>Likes: {likesComentario.length}</Text>

                                    {
                                        comentarioLikeado ?
                                            <Pressable style={styles.likeButton} onPress={() => sacarLikeComentario(item.id)}>
                                                <Text style={styles.heart}>❤️</Text>
                                            </Pressable>
                                            :
                                            <Pressable style={styles.likeButton} onPress={() => darLikeComentario(item.id)}>
                                                <Text style={styles.heart}>🩶</Text>
                                            </Pressable>
                                    }
                                </View>
                            );
                        }}
                    />
                    :
                    <Text style={styles.emptyText}>Todavía no hay comentarios.</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        paddingTop: 40,
    },

    commentBox: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
    },

    email: {
        fontSize: 13,
        color: '#555',
        fontWeight: 'bold',
        marginBottom: 6,
    },

    descripcion: {
        fontSize: 17,
        color: '#222',
        lineHeight: 22,
    },

    commentsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 8,
        marginBottom: 15,
    },

    commentEmail: {
        fontSize: 12,
        color: '#555',
        fontWeight: 'bold',
        marginBottom: 5,
    },

    commentText: {
        fontSize: 15,
        color: '#222',
        lineHeight: 20,
    },

    emptyText: {
        fontSize: 15,
        color: '#777',
        textAlign: 'center',
        marginTop: 25,
    },
    formBox: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 14,
        padding: 14,
        marginBottom: 18,
    },

    input: {
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        marginBottom: 10,
    },

    error: {
        color: 'red',
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'center',
    },

    button: {
        backgroundColor: '#222',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    likes: {
        fontSize: 14,
        color: '#222',
        marginTop: 10,
        fontWeight: 'bold',
    },
    likeButton: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },

    heart: {
        fontSize: 22,
    },
});

export default DetallePost;
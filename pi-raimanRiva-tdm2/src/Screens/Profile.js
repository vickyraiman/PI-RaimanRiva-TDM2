import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import { useEffect, useState } from 'react';
import Post from '../Components/Post';


function Profile(props) {
    const [username, setUsername] = useState("");
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(usuario => {
            if (usuario !== null) {
                setUser(usuario);

                db.collection('users')
                    .where('email', '==', usuario.email)
                    .onSnapshot(docs => {
                        docs.forEach(doc => {
                            setUsername(doc.data().username);
                        })
                    })

                db.collection('posts')
                    .orderBy('createdAt', 'desc')
                    .onSnapshot(docs => {
                        let posts = [];

                        docs.forEach(doc => {
                            if (doc.data().email === usuario.email) {
                                posts.push({
                                    id: doc.id,
                                    data: doc.data()
                                });
                            }
                        })

                        setPosts(posts);
                    })
            }
        })
    }, [])

    if (user === null) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        )
    }

    function Logout() {
        auth.signOut()
            .then(() => {
                props.navigation.navigate('LogIn');
            })
            .catch(error => {
                console.log('Error al cerrar sesión:', error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileBox}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>

            <Text style={styles.subtitle}>Mis Publicaciones</Text>

            {posts.length > 0 ?
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Post
                            post={item.data}
                            id={item.id}
                            navigation={props.navigation}
                        />
                    )}
                />
                :
                <Text style={styles.noPosts}>No has publicado nada aún.</Text>
            }

            <Pressable style={styles.logoutButton} onPress={() => Logout()}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 24,
        paddingTop: 35,
    },

    profileBox: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 10,
        padding: 24,
        marginBottom: 30,
    },

    title: {
        fontSize: 34,
        fontWeight: '300',
        color: '#222',
        marginBottom: 18,
    },

    username: {
        fontSize: 28,
        fontWeight: '500',
        color: '#222',
        marginBottom: 4,
    },

    email: {
        fontSize: 15,
        color: '#777',
    },

    subtitle: {
        fontSize: 30,
        fontWeight: '300',
        color: '#222',
        marginBottom: 20,
    },

    logoutButton: {
        backgroundColor: '#06477c',
        height: 50,
        width: 240,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 20,
    },

    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
    },

    postBox: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 10,
        padding: 18,
        marginBottom: 16,
    },

    postText: {
        fontSize: 16,
        color: '#333',
    },

    noPosts: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
    }
});

export default Profile;
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import { useEffect, useState } from 'react';
import Post from '../Components/Post';


function Profile(props) {
    const [username, setUsername] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('users')
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    setUsername(doc.data().username);
                })
            })

        db.collection('posts')
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                })

                setPosts(posts);
            })

    }, [])

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
                <Text style={styles.title}>Mi Perfil</Text>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.email}>{auth.currentUser.email}</Text>
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
        padding: 20,
        paddingTop: 60,
    },

    profileBox: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 14,
        padding: 18,
        marginBottom: 25,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 18,
    },

    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 6,
    },

    email: {
        fontSize: 14,
        color: '#555',
    },

    logoutButton: {
        backgroundColor: '#ffc4c4',
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 10,
        padding: 14,
        alignItems: 'center',
        marginTop: 20,
    },

    logoutText: {
        color: '#222',
        fontSize: 16,
        fontWeight: 'bold',
    },

    subtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 15,
    },

    postBox: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
    },

    postText: {
        fontSize: 16,
        color: '#222',
    },

    noPosts: {
        fontSize: 15,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default Profile;
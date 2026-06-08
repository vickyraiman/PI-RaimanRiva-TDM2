import {Text, View, StyleSheet, FlatList} from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import Post from '../Components/Post';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
            let postsArray = [];
            docs.forEach(doc => {
                postsArray.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setPosts(postsArray);
            setLoading(false);
        });
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loading}>Cargando...</Text>
            ) : (
                <FlatList
                    style={styles.list}
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Post 
                        post={item.data}
                        id={item.id}
                        />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        paddingTop: 50,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 20,
    },

    loading: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 30,
    },

    list: {
        width: '100%',
    },
});

export default Home;
import {Text, View, StyleSheet, FlatList} from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import Post from '../Components/Post';

function Home(props) {
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
            <Text style={styles.title}>Bienvenidos</Text>
            <Text style={styles.subtitle}>Posteos:</Text>

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
                        navigation={props.navigation}
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
        paddingHorizontal: 30,
        paddingTop: 40,
    },

    title: {
        fontSize: 46,
        fontWeight: '300',
        textAlign: 'center',
        color: '#222',
        marginBottom: 30,
    },

    loading: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginTop: 50,
    },

    list: {
        width: '100%',
    },
    subtitle: {
    fontSize: 22,
    color: '#222',
    marginBottom: 20,
}
});

export default Home;
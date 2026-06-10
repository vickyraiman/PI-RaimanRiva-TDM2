import {View, Text, StyleSheet, Pressable} from 'react-native';
import {db, auth} from '../firebase/config';
import firebase from "firebase";

function Post(props){

    let likes = props.post.likes;

    if (likes === undefined){
        likes = [];
    }
    let miEmail = auth.currentUser.email;
    let likeado = likes.includes(miEmail);

    function darLike(){
        db.collection('posts').doc(props.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(miEmail)
        })
        .then(() =>{
            console.log('Post likeado');
        })
        .catch(error => {
            console.log(error)
        });
    }

    function sacarLike(){
        db.collection('posts').doc(props.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(miEmail)
        })
        .then(() =>{
            console.log('Like sacado');
        })
        .catch(error => {
            console.log(error)
        });
    }

    return(
    <View style={styles.card}>
        <Text style={styles.email}>{props.post.email}</Text>
        <Text style={styles.descripcion}>{props.post.descripcion}</Text>

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

        <Pressable style={styles.commentButton} 
            onPress={() => props.navigation.navigate('DetallePost', {id: props.id, post: props.post})}>
                <Text style={styles.commentButtonText}>Comentar</Text>
        </Pressable>
    </View>
)
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 10,
        padding: 18,
        marginBottom: 20,
        width: '100%',
        fontFamily: 'Helvetica',
    },

    email: {
        fontSize: 12,
        color: '#222',
        fontWeight: '600',
        marginBottom: 10,
    },

    descripcion: {
        fontSize: 18,
        color: '#333',
        marginBottom: 12,
        lineHeight: 24,
        fontFamily: 'Helvetica',
    },

    likes: {
        fontSize: 15,
        color: '#444',
        marginBottom: 8,
    },

    likeButton: {
        alignSelf: 'flex-start',
    },

    heart: {
        fontSize: 24,
    },

    commentButton: {
        position: 'absolute',
        right: 20,
        bottom: 18,
        backgroundColor: '#06477c',
        width: 140,
        height: 42,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

    commentButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '400',
    },
});




export default Post;
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
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        width: '100%',
    },

    email: {
        fontSize: 12,
        color: '#555',
        fontWeight: 'bold',
        marginBottom: 6,
    },

    descripcion: {
        fontSize: 16,
        color: '#222',
        marginBottom: 10,
        lineHeight: 22,
    },

    likes: {
        fontSize: 14,
        color: '#222',
        marginBottom: 6,
    },

    likeButton: {
        alignSelf: 'flex-start',
    },

    heart: {
        fontSize: 22,
    },
    commentButton: {
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    
    commentButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});




export default Post;
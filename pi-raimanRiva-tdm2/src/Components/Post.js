import {View, Text, StyleSheet, Pressable} from 'react-native';
import {db, auth} from '../firebase/config';
import firebase from "firebase";

function Post(props){

    let likes = props.post.likes.length;

    if (likes === 0){
        likes = '';
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
        <View>
            <Text>{props.post.email}</Text>
            <Text>{props.post.descripcion}</Text>

            <Text>Likes: {likes.length}</Text>
                
                {
                    likeado ?
                    <Pressable onPress={() => sacarLike()}>
                        <Text>❤️</Text>
                    </Pressable>
                    :
                    <Pressable onPress={() => darLike()}>
                        <Text>🩶</Text>
                    </Pressable>
                }
        </View>
    )
}

export default Post;
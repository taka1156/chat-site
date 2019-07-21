<template>
    <div class="Account">
        <h1>Your account status</h1>
        <div v-if="user.uid">
            <div class="d-flex flex-column">
                <img :src = "user.photoURL" class="mx-auto user-icon">
                <h1>こんにちは!　{{user.displayName}}さん</h1>
                <button class="mx-auto btn btn-success" type="button" @click="logOut()">LogOut</button>
            </div>
        </div>
        <div v-else>
            <button class="mx-auto btn btn-success" type="button" @click="logIn()">TwitterLogin</button>
        </div>
    </div>
</template>

<script>
import str from '@/components/js/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default{
    data() {
        return{
             user: {},
        }
    },
     methods: {
        logIn(){
            const provider = new firebase.auth.TwitterAuthProvider();
            firebase.auth().signInWithRedirect(provider).then();
        },
        logOut(){
            firebase.auth().signOut().then().catch((err) => alert(err))
        }
    },
    mounted () {
        firebase.auth().onAuthStateChanged(user => {
            this.user = user ? user : {};
            str.UserInfo = this.user;
        })
    }
}
</script>

<style scoped>
.user-icon{
    height:100px;
    width:100px;
    border-radius:100px;
    border:solid 2px #d8d8d8;
}
</style>
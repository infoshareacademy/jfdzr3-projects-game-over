import firebase from "firebase";
import { data } from "./Data";
import { useState, useEffect } from "react";

const settings = { timestampsInSnapshots: true };

var firebaseConfig = {
    apiKey: "AIzaSyD6K_UBeeC2EwujnsrwxBgwcHW-JN0JeUw",
    authDomain: "gameworld-a20b3.firebaseapp.com",
    projectId: "gameworld-a20b3",
    storageBucket: "gameworld-a20b3.appspot.com",
    messagingSenderId: "124412031906",
    appId: "1:124412031906:web:368c522047cb5751bbb8fb",
    measurementId: "G-NN47R5618M",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

const db = firebase.firestore();
//dodanie danych do bazy 
export const addGame = (e) => {
    data.forEach((item) => {
        db.collection("games").add(item);
    });
};

export function useTopGames() {
    const [topGames, setTopGames] = useState([]);

    useEffect(() => {
        db.collection("games").onSnapshot((snapshot) => {
            const games = [];
            snapshot.docs.forEach((game) => games.push({ id: game.id, ...game.data() }));
            setTopGames(games);
        });
    }, []);

    return topGames;
}

import firebase from 'firebase/app';
import 'firebase/firestore';

let DB = firebase.firestore();
// ローカルの時刻は、ズレがあるのでサーバ時刻を使用
const TIME_STAMP = firebase.firestore.FieldValue.serverTimestamp();
//　インクリメント(同時書き換えを気にしなくていい)
const INCREMENT = firebase.firestore.FieldValue.increment(1);
const { Timestamp } = firebase.firestore;


const postRoom = async(room) => {
  // 部屋ドキュメントの参照
  const roomDocRef = await DB.collection('room').doc();
  // 部屋情報書き込み
  const result = await roomDocRef.set({
    roomUid: roomDocRef.id,
    roomName: room.roomName,
    detail: room.detail,
    pass: room.pass,
    uid: room.uid,
    userName: room.userName,
    date: TIME_STAMP
  })
  .then(() => 'success')
  .catch((e)=> e.message);

  // デフォルトのメッセージ書き込み(roomドキュメントにサブコレクションchatを生やす)
  roomDocRef.collection('chat').add({
    name: '管理者',
    img: '',
    message: room.roomName + 'にようこそ',
    date: TIME_STAMP
  })
  .then(() => 'success')
  .catch((e) => 'error');

  return result;
}

// チャットメッセージ
const postChat = async (roomId, chat) => {
  // 部屋ドキュメントの参照
  const roomDocRef = await DB.collection('room').doc(roomId);
  // メッセージ書き込み
  const result = await roomDocRef.collection('chat').add({
    name: chat.name,
    uid: chat.uid,
    img: chat.img,
    message: chat.message,
    date: TIME_STAMP
  })
  .then(()=> 'success')
  .catch((e) => 'error');

  return result;
}

const getRooms = async ({ seconds, nanoseconds }) => {
  // 部屋コレクションの参照
  const roomRef = await DB.collection('room');
  // ソートして現在取得している最後のアイテムの日付より古いものを取得(初回ならありえない値(サイト稼働前の日付))
  const timestamp = new Timestamp(seconds,  nanoseconds)
  const sortRoom = await roomRef.orderBy('date', 'desc').startAfter(timestamp);
  // 5件ずつ取得
  let rooms = await sortRoom.limit(5);

  const result = await rooms.get()
  .then(querySnapshot => {
    let rooms = [];
    querySnapshot.forEach(roomDoc => {
      rooms.push(roomDoc.data());
    });
    return {rooms: rooms, lastDate: rooms[rooms.length - 1].date, isEnd: false};
  })
  .catch((e) => {
    return { isEnd: true, error: e.message }
  });

  return result
}


const getChats = () => {}

const getRoom = async (roomUid) => {
  // 部屋コレクションの参照
  const roomDocRef = await DB.collection('room').doc(roomUid);
  const result = await roomDocRef.get().then(doc => {
    if(!doc.exists) {
      return 'error';
    } else {
      return doc.data();
    }
  }).catch(e => {
    return { error: e.message };
  });

  return result
}

export {
  getRoom,
  getRooms,
  postRoom,
  getChats,
  postChat
};
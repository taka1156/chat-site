import { DB, Timestamp, TIME_STAMP } from './index.js';

const postRoom = async room => {
  // 部屋ドキュメントの参照
  const roomDocRef = await DB.collection('room').doc();
  // 部屋情報書き込み
  const result = await roomDocRef
    .set({
      roomUid: roomDocRef.id,
      roomName: room.roomName,
      detail: room.detail,
      pass: room.pass,
      uid: room.uid,
      userName: room.userName,
      date: TIME_STAMP
    })
    .then(async () => {
      // デフォルトのメッセージ書き込み(roomドキュメントにサブコレクションchatを生やす)
      const botImg = 'https://firebasestorage.googleapis.com/v0/b/chatapp-f1e5d.appspot.com/o/bot.png?alt=media&token=72193d5d-c36c-459a-86f8-f503067e0a05';
      await postChat(roomDocRef.id, {
        name: 'ChatBot',
        uid: 'Bot',
        img: botImg,
        message: room.roomName + 'にようこそ'
      });

      return 'success';
    })
    .catch(e => e.message);

  return result;
};

// チャットメッセージ
const postChat = async (roomId, chat) => {
  // 部屋ドキュメントの参照
  const roomDocRef = await DB.collection('room').doc(roomId);
  // メッセージ書き込み
  const result = await roomDocRef
    .collection('chat')
    .add({
      name: chat.name,
      uid: chat.uid,
      img: chat.img,
      message: chat.message,
      date: TIME_STAMP
    })
    .then(() => 'success')
    .catch(e => 'error');

  return result;
};

const getRooms = async ({ seconds, nanoseconds }) => {
  // 部屋コレクションの参照
  const roomRef = await DB.collection('room');
  // ソートして現在取得している最後のアイテムの日付より古いものを取得(初回ならありえない値(サイト稼働前の日付))
  const timestamp = new Timestamp(seconds, nanoseconds);
  const sortRoom = await roomRef.orderBy('date', 'desc').startAfter(timestamp);
  // 5件ずつ取得
  let rooms = await sortRoom.limit(5);

  const result = await rooms
    .get()
    .then(querySnapshot => {
      let rooms = [];
      querySnapshot.forEach(roomDoc => {
        rooms.push(roomDoc.data());
      });
      return {
        rooms: rooms,
        lastDate: rooms[rooms.length - 1].date,
        isEnd: false
      };
    })
    .catch(e => {
      return { isEnd: true, error: e.message };
    });

  return result;
};

const getChats = () => {};

const getRoom = async roomUid => {
  // 部屋コレクションの参照
  const roomDocRef = await DB.collection('room').doc(roomUid);
  const result = await roomDocRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        return 'error';
      } else {
        return doc.data();
      }
    })
    .catch(e => {
      return { error: e.message };
    });

  return result;
};

export { DB, getRoom, getRooms, postRoom, getChats, postChat };

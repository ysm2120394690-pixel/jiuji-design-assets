/**
 * ============================================
 * Firebase 配置文件
 * ============================================
 */

const firebaseConfig = {
  apiKey: "AIzaSyAWCpBJGgkiRUEU_HOb8H52OdxN1jZlIcQ",
  authDomain: "jiuji-design.firebaseapp.com",
  projectId: "jiuji-design",
  storageBucket: "jiuji-design.firebasestorage.app",
  messagingSenderId: "11279685159",
  appId: "1:11279685159:web:49049e2533add91289e002",
  measurementId: "G-7HVGL7KZDV"
};

// 初始化 Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Firestore 设置 — 提高可靠性
db.settings({
  ignoreUndefinedProperties: true,  // 忽略 undefined 字段，避免写入失败
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED  // 离线缓存支持
});

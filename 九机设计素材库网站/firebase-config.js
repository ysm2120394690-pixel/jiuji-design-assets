/**
 * ============================================
 * Firebase 配置文件
 * ============================================
 * 请将以下配置替换为您在 Firebase Console 创建项目后获取的配置
 *
 * 获取方式：
 * 1. 访问 https://console.firebase.google.com/
 * 2. 进入您的项目
 * 3. 点击 ⚙️ 设置图标 → 项目设置 → 向下滚动到"您的应用"
 * 4. 点击 </> 注册 Web 应用，复制 firebaseConfig 对象
 */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 初始化 Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Firestore 安全规则：
// 在 Firebase Console → Firestore → 规则中设置以下规则
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户数据：只能读写自己的
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // 素材：所有人可读，登录用户可创建， 作者可编辑/删除
    match /assets/{assetId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.ownerId;
    }
    // Banner 配置
    match /banners/{bannerId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
*/
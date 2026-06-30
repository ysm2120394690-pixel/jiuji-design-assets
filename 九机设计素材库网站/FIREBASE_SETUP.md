# Firebase 项目创建指南

## 步骤 1：创建 Firebase 项目

1. 访问 https://console.firebase.google.com/
2. 使用 Google 账号登录
3. 点击 **添加项目**
4. 项目名称输入：`jiuji-design-assets`（或您喜欢的名字）
5. 关闭"为此项目启用 Google Analytics"（可选，免费版够用）
6. 点击**创建项目**，等待完成

---

## 步骤 2：注册 Web 应用

1. 进入项目后，点击左侧 **项目概览** 旁边的 **⚙️ 设置图标** → **项目设置**
2. 向下滚动到 **您的应用** 部分
3. 点击 **</> 图标**（Web 应用）
4. 填写：
   - 昵称：`九机设计素材库`
   - ❌ 不勾选"为此应用设置 Firebase Hosting"
5. 点击**注册应用**
6. 复制 `firebaseConfig` 对象，格式如下：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

---

## 步骤 3：启用身份验证

1. 左侧菜单点击 **构建** → **Authentication**（身份验证）
2. 点击 **开始使用**
3. 在 **Sign-in method（登录方式）** 标签页：
   - 点击 **手机** → 启用开关 → 保存
     > ⚠️ 中国大陆手机号需要配置短信发送，超出免费额度后付费
   - 点击 **电子邮件/密码** → 启用开关 → 保存
     > ✅ 推荐！更稳定，免费无限制

---

## 步骤 4：创建 Firestore 数据库

1. 左侧菜单点击 **构建** → **Firestore Database**
2. 点击 **创建数据库**
3. 选择区域：`香港`（asia-east2）或 `台湾`（asia-taiwan），延迟最低
4. 选择 **以测试模式开始** → 启用
5. 点击 **完成**

**注意**：测试模式下 30 天后需要设置安全规则，建议后续配置如下规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 所有登录用户可以读写自己的数据
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // 素材：所有人可读，登录用户可创建，作者可编辑删除
    match /assets/{assetId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.ownerId;
    }
  }
}
```

---

## 步骤 5：启用 Storage（文件存储）

1. 左侧菜单点击 **构建** → **Storage**（存储）
2. 点击 **开始使用**
3. 选择 **以测试模式开始** → 启用
4. 选择区域：与 Firestore 相同

**安全规则（测试模式后期需调整）：**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 缩略图：所有人可读，登录用户可上传
    match /thumbnails/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // 源文件：所有人可读，登录用户可上传
    match /sources/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Banner：所有人可读，登录用户可上传
    match /banners/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 步骤 6：将配置写入网站代码

注册完应用后复制 `firebaseConfig`，然后：
1. 打开文件夹中的 `firebase-config.js` 文件
2. 将您的配置粘贴进去
3. 保存文件

---

## 步骤 7：部署到线上

1. 创建一个 GitHub 仓库（参考部署指南.md）
2. 上传所有文件（包括 `firebase-config.js`）
3. 启用 GitHub Pages
4. 在 Firebase Console → 构建 → Hosting，关联 GitHub 实现自动部署

---

## 费用说明

| 服务 | 免费额度 | 超出后 |
|------|---------|--------|
| Firebase Auth | 每月 10,000 次验证 | 按次计费极低 |
| Firestore | 50,000 次读写/天 | $0.18/10万读写 |
| Storage | 5GB 存储 + 1GB/天下载 | $0.026/GB |

**对于一个中小型团队的设计素材库，免费额度完全够用！**

---

## 获取帮助

Firebase 官方文档：https://firebase.google.com/docs
中文教程：https://firebase.google.cn/docs
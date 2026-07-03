/**
 * ============================================
 * CloudBase (腾讯云开发) 配置文件
 * 环境: jiuji-design (免费版)
 * ============================================
 */

const cloudbaseConfig = {
  env: 'jiuji-design-d5g56p07b3cf8261a',
  region: 'ap-shanghai'  // 手机验证码登录需要上海地域
};

// 初始化 CloudBase
const app = cloudbase.init(cloudbaseConfig);

// 服务引用
const auth = app.auth({ persistence: 'local' });
const db = app.database();
const _ = db.command;  // 查询操作符

console.log('CloudBase 初始化完成，环境:', cloudbaseConfig.env);

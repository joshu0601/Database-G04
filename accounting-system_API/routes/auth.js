var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
router.post('/verify-token', function(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: '未提供 token',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        message: 'token 驗證失敗',
      });
    }

    res.status(200).json({
      ok: true,
      message: 'token 驗證成功',
      user: decoded,
    });
  });
});
/* 使用者註冊 */
router.post('/register', function(req, res, next) {
  // 從請求中獲取使用者資訊
  const { name, password, email } = req.body;

  // 這裡應該添加:
  // 1. 資料驗證
  // 2. 檢查使用者是否已存在
  // 3. 密碼加密
  // 4. 將使用者資訊存入資料庫

  // 範例回應
  res.status(201).json({
    ok: true,
    message: '註冊成功',
    user: { name, email }
  });
});

/* 使用者登入 */
router.post('/login', function(req, res, next) {
  // 從請求中獲取登入資訊
  const { email, password } = req.body;

  // 假設有一個用於驗證使用者的函數
  const isValidUser = (email, password) => {
    // 在這裡應該檢查使用者是否存在以及密碼是否正確
    // 這裡僅作為範例返回 true
    return true;
  };

  if (isValidUser(email, password)) {
    // 使用環境變數生成 JWT token
    const token = jwt.sign(
      { email }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      ok: true,
      message: '登入成功',
      user: "KKK",
      token: token,
    });
  } else {
    res.status(401).json({
      ok: false,
      message: '使用者名稱或密碼錯誤',
    });
  }
});

module.exports = router;
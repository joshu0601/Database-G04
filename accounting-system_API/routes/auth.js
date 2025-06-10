var express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
var router = express.Router();
const db = mysql.createPool({
  host: 'database-g04.cj48gosu0lpo.ap-northeast-1.rds.amazonaws.com',
  user: 'customer',
  password: '1234',
  database: 'accounting_system'
});
router.post('/verify-token', function(req, res, next) {
  const token = req.body['authorization'];

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
router.post('/register', async function(req, res, next) {
  const { name, password, email } = req.body;

  // 1. 檢查 email 是否已存在
  const [rows] = await db.query('SELECT * FROM users WHERE user_account = ?', [email]);
  if (rows.length > 0) {
    return res.status(400).json({ ok: false, message: 'Email 已註冊' });
  }

  // 2. 密碼加密（建議用 bcrypt）
  //const bcrypt = require('bcrypt');
  //const hash = await bcrypt.hash(password, 10);

  // 3. 新增使用者
  await db.query('INSERT INTO users (name, user_account) VALUES (?, ?)', [name, email]);

  res.status(201).json({
    ok: true,
    message: '註冊成功',
    user: { name, email }
  });
});

/* 使用者登入 */
router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;

  try {
    // 查詢資料庫是否有這個帳號
    const [rows] = await db.query('SELECT * FROM users WHERE user_account = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({
        ok: false,
        message: '使用者不存在',
      });
      
    }

    const user = rows[0];
    // 檢查密碼（這裡假設密碼未加密，若有加密請改用 bcrypt.compare）
    /*if (user.password !== password) {
      return res.status(401).json({
        ok: false,
        message: '密碼錯誤',
      });*/

    // 產生 JWT token
    const token = jwt.sign(
      { id: user.user_id, name: user.name, email: user.user_account },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      ok: true,
      message: '登入成功',
      token: token,
      user: {
        name: user.name,
        email: user.user_account
      }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: '伺服器錯誤',
      error: error.message,
    });
  }
});

module.exports = router;
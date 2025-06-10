const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const router = express.Router();

const db = mysql.createPool({
  host: 'database-g04.cj48gosu0lpo.ap-northeast-1.rds.amazonaws.com',
  user: 'customer',
  password: '1234',
  database: 'accounting_system'
});

// JWT 驗證 middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ ok: false, message: '缺少 token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ ok: false, message: 'token 驗證失敗' });
    }
    req.user = decoded; // decoded 會有 id, name, email
    next();
  });
}

// 取得指定使用者的財務摘要（需驗證 token）
router.get('/dashbo', authenticateToken, async function(req, res, next) {
  const userId = req.user.id; // 直接從 token 取得

  try {
    const [rows] = await db.query(
      'SELECT total_assets,total_income,total_expense FROM user_financial_summary WHERE user_id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: '找不到該使用者'
      });
    }
    res.status(200).json({
      ok: true,
      data: {
        total_assets: Number(rows[0].total_assets),
        total_income: Number(rows[0].total_income),
        total_expense: Number(rows[0].total_expense)
      }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: '伺服器錯誤',
      error: error.message
    });
  }
});

module.exports = router;
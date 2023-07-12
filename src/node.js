const express = require('express');
const admin = require('firebase-admin');
const mysql = require('mysql');

const app = express();

// Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // Firebase 프로젝트 구성 정보를 추가합니다.
});

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: '3306',
  user: 'hansori',
  password: 'hansori0808',
  database: 'database-1.c1g2mrn4lbxn.ap-northeast-2.rds.amazonaws.com',
});

// MySQL 데이터베이스 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Firebase에서 유저 정보를 가져와 MySQL에 입력하는 엔드포인트
app.get('/sync-users', async (req, res) => {
  try {
    const firebaseUsers = await admin.auth().listUsers();
    const users = firebaseUsers.users;

    for (const user of users) {
      const { uid, email } = user;

      // MySQL에 데이터 입력
      const query = `INSERT INTO users (uid, email) VALUES (?, ?)`;
      db.query(query, [uid, email], (error, results) => {
        if (error) {
          console.error('Failed to insert user:', error);
          return;
        }
        console.log('User inserted:', results);
      });
    }

    res.send('User synchronization complete');
  } catch (error) {
    console.error('Failed to sync users:', error);
    res.status(500).send('Failed to sync users');
  }
});

// 서버 시작
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

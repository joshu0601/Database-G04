# 題目：記帳管理系統
在Amazon RDS建立一個雲端資料庫，可以供使用者記帳。用戶可以創建自己的帳號，可記錄總資產、收入、支出、財務總覽、交易紀錄、支出分類。
## 應用情境
1. 每月薪水規劃:
使用者每月領薪水後，將薪資輸入系統，設定儲蓄目標與每月各類支出上限，（例如：飲食 $6000，交通 $2000）。

2. 日常消費紀錄:
每花一筆錢，快速打開 App 記錄，可以透過標籤或分類，（如：飲食、交通、娛樂）整理資料。

3. 支出統計與趨勢分析:
自動生成月報表或週報表，顯示：每類支出金額、哪一天花最多錢、哪些分類超出預算。

5. 存錢挑戰與目標追蹤:
設定短期/中期儲蓄目標，（例如：三個月存$15000），系統追蹤進度，提醒用戶節制支出。

| 使用者        | 使用案例說明                                                             |    
|--------------|-------------------------------------------------------------------------|
| 學生         |平時紀錄一些生活花費(早餐、午餐、晚餐)，或者依些娛樂的費用。|
| 上班族       |清楚記錄每月的工資收入，以及平時的一些生活花費，也能規劃屬於自己的儲蓄目標。|
| 會計師       |紀錄平時公司的收支情況，也能在最後統整時將整體收支畫成圖表供老闆看。|

## 系統需求說明
| 系統功能          | 功能說明                        |
|------------------|-------------------------------|
| 註冊登入       |每位使用者都可以註冊一個自己的帳號，自己管理自己帳號內的金錢|
| 日常消費紀錄   |使用這可以記錄自己日常的花費，例如吃飯、娛樂...等費用|
| 存錢挑戰與目標追蹤 |使用者可以為自己設立一個存錢的目標，且系統會跟你說目前離你的目標還差多遠|    

## 使用案例範例
| 使用情境           | 角色介紹                 | 案例描述                                                                 |
|--------------------|-----------------------------------|--------------------------------------------------------------------------|
| 每月薪水規劃       | 小宋，27 歲上班族      | 每月薪資 $35,000，設定飲食 $6000、交通 $2500 等預算，並目標每月存 $8000。系統會提醒她哪些項目快要超支。 |
| 日常消費紀錄       | 老高，21 歲大學生         | 每次花費後透過分類（如飲食、交通）快速記帳，使用「#朋友聚餐」等標籤補充內容。                       |
| 存錢挑戰與目標追蹤 | 小郭，23 歲社會新鮮人     | 設定三個月內存 $15,000 的旅費，系統每週追蹤儲蓄進度，未達標時發出提醒並給予鼓勵。                   |
| 支出統計與趨勢分析 | 張三，30 歲公司會計師    | 系統自動生成圖表顯示支出比例，幫助他跟老闆報告目前公司的收支情形。                               |

## 資料表
### 📋 users 使用者資料表

| 欄位名稱      | 資料型別  | 限制條件                      | 說明       |
|--------------|-----------|-------------------------------|------------|
| user_id      | AUTO_INCREMENT| PRIMARY KEY                   | 使用者 ID  |
| user_account | VARCHAR(255) | UNIQUE,NOT NULL            | 使用者帳號 |
| user_password| VARCHAR(24)| NOT NULL                      | 使用者密碼 |
| name         | VARCHAR(50)  | NOT NULL                      | 姓名    |
| total_assets | INTEGER   |DEFAULT 0 CHECK (total_assets >= 0)| 總資產|
| created_at   | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP     | 建立時間   |
不能有密碼儲存在資料庫，要另外拉資料庫
### 📋 users 限制條件

| 欄位名稱      | 限制條件                                                                              |
|--------------|---------------------------------------------------------------------------------------|
| user_id      | 系統會依照使用者建立順序去對每個使用者給一個整數當作ID，該整數是從1開始的，每多一個使用者就+1 |
| user_account | 可以有英文字母大小寫Aa到Zz、數字由0到9組成，只允許特殊符號@、#、$、%，同個帳號不能建立兩次，只能唯一|
| name         | 名稱只能是英文字母大小寫Aa~Zz，不允許中文字與其他外文或包含特殊符號，長度最多為50|
| total_assets | 總資產只能是數字0~9組成，不能有除數字以外或特殊符號，且必須大於0|
| created_at   | 建立時間格式為 aaaa年bb月cc日，系統會設定使用者建立當下的時間為預設值|

### 📋 users 使用者資料表SQL
```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_account VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(24) NOT NULL,
    name VARCHAR(50) NOT NULL,
    total_assets INT DEFAULT 0 CHECK (total_assets >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 📋 users 使用者資料表SQL範例
```sql
INSERT INTO users (user_account, user_password, name, total_assets) VALUES
('xiaosong', 'abc123', '小宋', 350000),
('laogao', 'def456', '老高', 80000),
('xiaoguo', 'ghi789', '小郭', 28000),
('zhangsan', 'jkl000', '張三', 60000);
```
---
### 📋 categories 交易分類表

| 欄位名稱   | 資料型別 | 限制條件                                | 說明         |
|------------|----------|-----------------------------------------|--------------|
| category_id| AUTO_INCREMENT| PRIMARY KEY                             | 分類 ID      |
| user_id    | INTEGER  | FOREIGN KEY → users(user_id)            | 使用者 ID    |
| name       | VARCHAR(50) | NOT NULL, UNIQUE(user_id, name)      | 分類名稱     |

### 📋 categories 交易分類表SQL
```sql
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(50) NOT NULL,
    UNIQUE (user_id, name),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```
### 📋 categories 交易分類表SQL範例
```sql
INSERT INTO categories (user_id, name) VALUES
(1, '飲食'), (1, '交通'),
(2, '飲食'), (2, '娛樂'),
(3, '旅遊'), (3, '飲料'),
(4, '業務開銷'), (4, '報帳用餐');
```
---

### 📋 transactions 交易紀錄表

| 欄位名稱     | 資料型別 | 限制條件                                  | 說明           |
|--------------|----------|-------------------------------------------|----------------|
| transaction_id   | AUTO_INCREMENT   | PRIMARY KEY                   | 交易 ID|
| user_id      | INTEGER  | FOREIGN KEY → users(user_id)              | 使用者 ID |
| category_id  | INTEGER  | FOREIGN KEY → categories(category_id)     | 分類 ID     |
| type         | ENUM('Income', 'Expense')|  NOT NULL                  | 收入支出分類    |
|amount        |INT|               NOT NULL CHECK (amount >= 0)        | 金額       |
| transaction_date | DATE     | NOT NULL                             | 交易日期       |
| description   | VARCHAR(255)|                                      | 此項交易說明  |
| created_at   | TIMESTAMP|        DEFAULT CURRENT_TIMESTAMP         | 創建時間  |

### 📋 transactions 交易紀錄表SQL
```sql
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type ENUM('Income', 'Expense') NOT NULL,
    amount INT NOT NULL CHECK (amount >= 0),
    category_id INT,
    transaction_date DATE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
```
### 📋 expenses 交易紀錄表SQL範例
```sql
INSERT INTO transactions (user_id, type, amount, category_id, transaction_date, description)
VALUES
(1, 'Income', 35000, NULL, '2025-05-01', '五月薪資'), -- 小宋的月薪
(1, 'Expense', 180, 1, '2025-05-02', '便當 #午餐'), -- 小宋的支出
(2, 'Income', 8000, NULL, '2025-05-01', '兼職收入'), -- 老高的收入
(2, 'Expense', 120, 3, '2025-05-02', '滷味宵夜 #朋友聚餐'), -- 老高的支出
(3, 'Income', 28000, NULL, '2025-05-01', '五月薪資'), -- 小郭的收入
(3, 'Expense', 1500, 5, '2025-05-05', '雲林高鐵票'), -- 小郭的支出
(4, 'Income', 60000, NULL, '2025-05-01', '月薪 #公司'), -- 張三的收入
(4, 'Expense', 3200, 7, '2025-05-01', '部門聚餐'), -- 張三的支出
```
---

### 📋 budgets 每月預算表

| 欄位名稱     | 資料型別 | 限制條件                                            | 說明             |
|--------------|----------|-----------------------------------------------------|------------------|
| budget_id    | AUTO_INCREMENT   | PRIMARY KEY                                 | 預算 ID         |
| user_id      | INTEGER  | FOREIGN KEY → users(user_id)                        | 使用者 ID        |
| category_id  | INTEGER  | FOREIGN KEY → categories(category_id)               | 分類 ID          |
| year         | INTEGER  | NOT NULL                                            | 年份             |
| month        | INTEGER  | NOT NULL, CHECK (month BETWEEN 1 AND 12)            | 月份             |
| budget_limit | INTEGER  | NOT NULL, CHECK (budget_limit >= 0)                 | 分類預算金額     |
| spent_amount | INTEGER  | DEFAULT 0 CHECK (spent_amount >= 0)                 | 已花費預算       |

### 📋 budgets 每月預算表SQL
```sql
CREATE TABLE budgets (
    budget_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category_id INT,
    year INT NOT NULL,
    month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
    budget_limit INT NOT NULL CHECK (budget_limit >= 0),
    spent_amount INT DEFAULT 0 CHECK (spent_amount >= 0),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
```
### 📋 budgets 每月預算表SQL範例
```sql
INSERT INTO budgets (user_id, category_id, year, month, budget_limit) VALUES
(1, 1, 2025, 5, 6000), (1, 2, 2025, 5, 2500),
(2, 3, 2025, 5, 3000), (2, 4, 2025, 5, 1500),
(3, 5, 2025, 5, 2000), (3, 6, 2025, 5, 800),
(4, 7, 2025, 5, 8000), (4, 8, 2025, 5, 4000);
```
---

### 📋 saving_goals 儲蓄目標表

| 欄位名稱       | 資料型別 | 限制條件                                | 說明             |
|----------------|----------|-----------------------------------------|------------------|
| goal_id        | AUTO_INCREMENT   | PRIMARY KEY                             | 目標 ID  |
| user_id        | INTEGER  | FOREIGN KEY → users(user_id)            | 使用者 ID        |
| name           | VARCHAR(50) | NOT NULL                             | 儲蓄目標名稱     |
| target_amount  | INTEGER  | NOT NULL, CHECK (target_amount > 0)     | 目標金額         |
| current_amount | INTEGER  | DEFAULT 0, CHECK (current_amount >= 0)  | 目前已儲蓄金額   |
| start_date     | DATE     | NOT NULL                                | 儲蓄開始日期     |
| end_date       | DATE     | NOT NULL                                | 儲蓄結束日期     |
| created_at     | TIMESTAMP| DEFAULT CURRENT_TIMESTAMP               | 建立時間         |
| status     | VARCHAR(20)| DEFAULT 'Active' CHECK (status IN ('Active', 'Completed')) | 目標完成狀態|

### 📋 saving_goals 儲蓄目標表SQL
```sql
CREATE TABLE saving_goals (
    goal_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(50) NOT NULL,
    target_amount INT NOT NULL CHECK (target_amount > 0),
    current_amount INT DEFAULT 0 CHECK (current_amount >= 0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```
### 📋 saving_goals 儲蓄目標表SQL範例
```sql
INSERT INTO saving_goals (user_id, name, target_amount, start_date, end_date) VALUES
(1, '每月儲蓄計畫', 8000, '2025-05-01', '2025-05-31'),
(2, '筆電基金', 20000, '2025-05-01', '2025-09-01'),
(3, '日本自由行基金', 15000, '2025-05-01', '2025-07-31'),
(4, '退休儲蓄目標', 1000000, '2025-01-01', '2035-01-01');
```
---
### 完整性限制
| 資料表(Table)      |     主鍵(Primary Key)    |                  說明                 |
|-------------|------------|-----------------------------------------------------------|
| users       | user_id    |                  每個使用者都有唯一的號碼來辨識身分          |
| categories  | category_id|        每個建立的類別都有唯一的編號                          |
| transactions    | transaction_id |           每一筆支出紀錄都有唯一的編號               |
| budgets     | budget_id  |     每一筆月預算表都有唯一的編號                             |
| saving_goals| goal_id    |   每一個儲蓄目標都有唯一的編號                               |

|    子資料表(Child Table)    |     外鍵(Foreign Key)     |  參照主資料表(Parent Table)  |                    說明                     |
|--------------|------------------|----------------|---------------------------------------------|
| categories   | user_id          | users          | 每一個類別都是關聯到一位已經註冊的使用者     |
| transactions     | user_id          | users          | 每一筆交易紀錄都是關聯到一位已經註冊的使用者 |
| transactions     | category_id      | categories     | 每一筆交易紀錄表會屬於一個已經建立的類別     |
| budgets      | user_id          | users          | 每個每月預算表會關聯一位已經註冊的使用者     |
| budgets      | category_id      | categories     | 每個每月預算表會屬於一個已經建立的類別       |
| saving_goals | user_id          | users          | 每個儲蓄目標表會關聯到一個已經註冊的使用者    |
---

## ER Diagram(改)

![ER 圖](image/新ER圖.png)


## 🏆 團隊成員


| 成員 | 學號 | 班級 | 專題負責部分 |
|------|------|------|------|
| [宋協燦](./profile/宋協燦.md) | 41143214 | 資工三乙 | 
| [高浩城](./profile/高浩城.md) | 41143228 | 資工三乙 | 
| [張承翰](./profile/張承翰.md) | 41143230 | 資工三乙 | 
| [郭建杰](./profile/郭建杰.md) | 41143232 | 資工三乙 | 

# Bitri Recipe - REST API
Repository Github: [```https://github.com/pitlimitCode/Bitri_Recipe_Web```](https://github.com/pitlimitCode/Bitri_Recipe_Web)  
Referensi User Interface: [```Figma UI```](https://www.figma.com/file/SUbBTYCq1e4ngRt20lSdqr/Food-Recipe?node-id=47%3A1273)  

Lompat ke:  
[Cloning dan Set Up program ini di Local Device](#Cloning-dan-Set-Up-program-ini-di-Local-Device)  
[Set Up PostgreSQL](#Set-Up-PostgreSQL)  
[Set Up Postman](#Set-Up-Postman)  
[Persyaratan Tugas: Beginner Backend & Intermediate Backend, dan Revisi](#Persyaratan-Tugas-dan-Revisi)  

notes untuk pribadi, sementara:  
handling error multer limits fileSize, & membuat multer dalam function. Lihat di repo live coding.  
Step revisi:  
*buat multer dalam function dan semua multer dimasukkan ke dalam 1 file.js di folder middleware  
*buat multer array  
*cari tahu handling error multer limits fileSize (terlalu rumit, minim problem solver reference)  
link invite postman  
back up an postgres  

---
## Cloning dan Set Up program ini di Local Device  

### Cloning:  
```shell
git clone -b FrontEnd+ https://github.com/pitlimitCode/Bitri_Recipe_Web.git 
```

### NPM Install:  
```shell
npm install  
```

### Isian .env:  
```shell
DB_HOST="localhost"
DB_NAME="SET_DB_NAME"
DB_PORT="5432"
DB_USER="postgres"
DB_PASS="*****"
JWT_ALG="HS256"
JWT_KEY="gaspol"
```

---
## Set Up PostgreSQL  
PostgreSQl sebagai penyimpanan data di database local

### Buat nama Database:  
Buat nama Database di postgreSQL sesuai keinginan.  

### Back Up an data PostgreSQL  
```shell
coming soon (Back Up an data PostgreSQL)  
```

---
## Set Up Postman  
Postman aplikasi untuk bisa melakukan CRUD pada REST API, sebelum digunakan di Front-end  
[```Join Team Postman```](https://app.getpostman.com/join-team?invite_code=da9a8abdcba442fdfc6ea16e678e566a)  

---
## Jalankan REST API / program di local  
```shell
nodemon 
```

---
# Persyaratan Tugas dan Revisi  
## Intermediate Backend  
### Catatan revisi setelah presentase Intermediate Backend 01 Juli:  
  - kirim variabel dari function sebelumnya.  
  - pagination ada limit page nya dari keseluruhan data.  
  - handling error multer limits fileSize, & membuat multer dalam function. Lihat di repo live coding.  

### Persyaratan yang belum selesai saat presentasi Intermediate Backend 01 Juli:  
  - Belum menggunakan middleware JWT Verify dari Controllers
  - Belum membuat Multer dalam 1 file, masing-masing multer harus dalam function.
  - Belum handle error Multer maximum size
  - Belum buat Multer.array (upload lebih dari 1 file)

### Tugas Intermediate Backend 27 Juni:  
  - Revisi sebelumnya harus selesai.
  - Penggunaan CORS.
  - Hash password (di register user).
  - Compare hash password (di login).
  - Saat Register dan LogIn terima JWT.
  - Client harus pakai token ketika akses post put delete.

## Beginner Backend  
### Catatan revisi setelah presentasi Beginner Backend:  
  - Perbaiki penggunaan .env bersama db.js
  - Perbaiki CRUD: validasi, delete id jangan tereksekusi 2x, handling unique input
  - Buat pagination
  - Buat multer untuk inputan file data, lengkap dengan limitasi data file
  - Pakai Cors
  - Push tugas di github pakai file .gitignore untuk mengabaikan node_modules dan .env

### Persyaratan yang telah selesai saat presentasi Beginner Backend:  
  - Gunakan Bahasa Inggris untuk nama File dan Fungsi
  - Table (Recipe, User, Comment)
  - Linter (esLint)
  - ENV (npm: dotenv)
  - Cors (middleware)
  - CRUD Create Read Update Delete
  - Error Handling
  - Pencarian Resep berdasarkan nama
  - Resep terbaru maksimal 5
  - Comment by resep
  - Resep by user

### Tugas Beginner Backend:
Persyaratan:  
  - Table Database (Recipe, User, Comment)  
  - ENV  
  - Linter  
  - CORS  
  - Gunakan Bahasa Inggris untuk nama File dan Fungsi  
  - CRUD (Create Read Update Delete)  
  - Pencarian Resep berdasarkan nama  
  - Resep terbaru maksimal 5  
  - Error Handling  
  - Upload/push tugas kamu ke GitHub dan gunakan nama yang profesional  
  - Presentasikan:  
    - Apa yang telah Anda lakukan dalam minggu ini  
    - Jelaskan: Express, Body-parser, Helmet, Nodemon, Postgre 
    - Ceritakan dan Demokan tentang proyek ini  
    - Flowchart Aplikasi  
    - Dokumentasi Postman  
    - Dapat didemokan menggunakan postman  

Persyaratan tambahan (opsional):
  - Pagination
  - Comment by resep
  - Resep by user

Persyaratan tambahan lain-lain (opsional):
  - Multer (middleware)
  - Crypto-js
  - Validator
  - Autentifikator

---

## notes lain-lain:
### Penulisan syntax di terminal untuk membuat table (Create Table) di database postgreSQl:  
```shell
CREATE TABLE users (  
id SERIAL PRIMARY KEY,  
name varchar(32) NOT NULL,  
email varchar(32) NOT NULL UNIQUE,  
phone_number integer,  
password varchar(64) NOT NULL,  
avatar varchar(32)  
); 
```
```shell
CREATE TABLE recipes (  
id SERIAL PRIMARY KEY,  
id_user integer NOT NULL,  
name varchar(64) NOT NULL,  
ingredients varchar(32) NOT NULL,  
step text,  
image text,  
video varchar(32)  
);  
```
```shell
CREATE TABLE comments (  
id SERIAL PRIMARY KEY,  
id_recipe integer NOT NULL,  
id_commenter integer NOT NULL,  
comment_text text NOT NULL  
);  
``` 

### Command Terminal untuk melihat semua tabel di postgreSQL:  
```shell
\d
```

### List of relations  
(6 rows)  
| Schema | Name            | Type     | Owner    |
| ------ | --------------- | -------- | -------- |
| public | comments        | table    | postgres |
| public | comments_id_seq | sequence | postgres |
| public | recipes         | table    | postgres |
| public | recipes_id_seq  | sequence | postgres |
| public | users           | table    | postgres |
| public | users_id_seq    | sequence | postgres |

### Format database yang telah dibuat:  
| users table  | data type | not_null? | unique? | primary_key? | foreign_key |
| ------------ | --------- | --------- | ------- | -----------  | ----------- |
| id           | int       |     y     |    y    |      y       |      -      |
| name         | varchar   |     y     |    -    |      -       |      -      |
| email        | varchar   |     y     |    y    |      -       |      -      |
| phone_number | int       |     -     |    -    |      -       |      -      |
| password     | varchar   |     y     |    -    |      -       |      -      |
| avatar       | varchar   |     -     |    -    |      -       |      -      |

| recipes table | data type | not_null? | unique? | primary_key? | foreign_key  |
| ------------- | --------- | --------- | ------- | ------------ | ------------ |
| id            | integer   |     y     |    y    |      y       |       -      |
| id_user       | integer   |     y     |    -    |      -       |  (users.id)  |
| name          | varchar   |     y     |    -    |      -       |       -      |
| ingredients   | varchar   |     y     |    -    |      -       |       -      |
| step          | varchar   |     -     |    -    |      -       |       -      |
| image         | varchar   |     -     |    -    |      -       |       -      |
| video         | varchar   |     -     |    -    |      -       |       -      |

| comments table | data type | not_null? | unique? | primary_key? | foreign_key  |
| -------------- | --------- | --------- | ------- | ------------ | ------------ |
| id             | integer   |     y     |    y    |      y       |       -      |
| id_recipe      | integer   |     y     |    -    |      -       | (recipes.id) |
| id_commenter   | integer   |     y     |    -    |      -       |  (users.id)  |
| comment_text   | text      |     y     |    -    |      -       |       -      |

---
### Configurasi penggunakan ESlint untuk kerapihan penulisan Ecma Script
```shell
npm init @eslint/config
```

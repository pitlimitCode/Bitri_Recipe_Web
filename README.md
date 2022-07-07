# Bitri Recipe
### Website Application

<!-- [Catatan revisi setelah presentasi](#Catatan-revisi-setelah-presentasi)   -->
<!-- [Ringkasan tugas](#Ringkasan-tugas)   -->
<!-- [Format database yang ku buat](#Format-database-yang-ku-buat)   -->
<!-- [Soal asli / original](#Soal-asli--original)  -->

## Tugas Frontend dgn React 05 juli:
- Melanjutkan program Backend Sebelumnya
- Semua requirement dari Week sebelumnya
- Navigation (Public & Private) (private *)
- Slicing: 
  - Login, 
  - register, 
  - Landing Page (new recipe, and 6 recipe with pagination), 
  - Detail recipe,
  - Halaman video?,
  - nambah recipe,
  - profile (foto, nama, resep yang udah dibuat)
- localStorage (*)
- Redux (CRUD) & with file (*)
- URL Params (Search, Sort, da Pagination)
- Build & Deploy (*)
- ENV
- Responsive (optional, nilai plus)
- Linter
- Hooks [function component, atomic design]
- Webpack (tidak perlu)
- Persist storage (tidak perlu)
- Gunakan Bahasa Inggris untuk nama File dan Fungsi
- Uploas/push tugas kamu ke github dan gunakan nama yang profesional
- Presentasikan apa yang telah Anda lakukan dalam minggu ini
  - Jelaskan dengan bahasa kalian sendiri tentang apa itu dan konsep tentang:
    - Redux
    - HOC
  - Ceritakan dan Demokan tentang proyek ini
- Css design pakai react bootstrap atau bootstrap
(*)dijelaskan di kelas tambahan  

### Catatan revisi setelah presentase Intermediate Backend 01 Juli:
1. kirim variabel dari function sebelumnya. (Sudah)  
2. pagination ada limit page nya dari keseluruhan data. (Sudah)  
3. handling error multer limits fileSize, & membuat multer dalam function. Lihat di repo live coding. (Belum)  
  Step revisi:  
  *buat multer dalam function dan semua multer dimasukkan ke dalam 1 file.js di folder middleware  
  *buat multer array  
  *cari tahu handling error multer limits fileSize (terlalu rumit, minim problem solver reference)  

### Persyaratan yang belum selesai saat presentasi Intermediate Backend 01 Juli:
  - Belum menggunakan middleware JWT Verify dari Controllers
  - Belum membuat Multer dalam 1 file, masing-masing multer harus dalam function.
  - Belum handle error Multer maximum size
  - Belum buat Multer.array (upload lebih dari 1 file)

## Tugas Intermediate Backend 27 Juni:
  - Revisi sebelumnya harus selesai.
  - Penggunaan CORS.
  - Hash password (di register user).
  - Compare hash password (di login).
  - Saat Register dan LogIn terima JWT.
  - Client harus pakai token ketika akses post put delete.
---
### Format database yang dibuat:
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

CREATE TABLE users (  
id SERIAL PRIMARY KEY,  
name varchar(32) NOT NULL,  
email varchar(32) NOT NULL UNIQUE,  
phone_number integer,  
password varchar(64) NOT NULL,  
avatar varchar(32)  
);  
CREATE TABLE recipes (  
id SERIAL PRIMARY KEY,  
id_user integer NOT NULL,  
name varchar(64) NOT NULL,  
ingredients varchar(32) NOT NULL,  
step text,  
image text,  
video varchar(32)  
);  
CREATE TABLE comments (  
id SERIAL PRIMARY KEY,  
id_recipe integer NOT NULL,  
id_commenter integer NOT NULL,  
comment_text text NOT NULL  
);  

\d, postgres:  
               List of relations  
 Schema |      Name       |   Type   |  Owner     
--------+-----------------+----------+----------  
 public | comments        | table    | postgres  
 public | comments_id_seq | sequence | postgres  
 public | recipes         | table    | postgres  
 public | recipes_id_seq  | sequence | postgres  
 public | users           | table    | postgres  
 public | users_id_seq    | sequence | postgres  
(6 rows)  

---
---
### Catatan revisi setelah presentasi Beginner Backend:
  - Perbaiki penggunaan .env bersama db.js
  - Perbaiki CRUD: validasi, delete id jangan tereksekusi 2x, handling unique input
  - Buat pagination
  - Buat multer untuk inputan file data, lengkap dengan limitasi data file
  - Pakai Cors
  - Push tugas di github pakai file .gitignore yang mengabaikan node_modules

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

## Ringkasan tugas Beginner Backend:
Persyaratan:  
  - Gunakan Bahasa Inggris untuk nama File dan Fungsi  
  - Table (Recipe, User, Comment)  
  - Linter  
  - ENV  
  - Cors  
  - CRUD Create Read Update Delete  
  - Error Handling  
  - Pencarian Resep berdasarkan nama  
  - Resep terbaru maksimal 5  
  - Presentasikan (ppt) :  
    - apa yang telah Anda lakukan dalam minggu ini  
      - Express 
      - Body-parser  
      - Helmet  
      - Nodemon  
      - Postgre  
    - Ceritakan dan Demokan tentang proyek ini  
    - Flowchart Aplikasi  
    - Dokumentasi Postman  
    - Dapat didemokan menggunakan postman  
  - Upload/push tugas kamu ke GitHub dan gunakan nama yang profesional  

Persyaratan tambahan (opsional):
  - Pagination
  - Comment by resep
  - Resep by user

Persyaratan tambahan lain-lain (opsional):
  - Multer (middleware)
  - Crypto-js
  - Validator
  - Autentifikator

### Soal asli / original Beginner Backend:
Buatlah API dari aplikasi dibawah ini  
https://www.figma.com/file/SUbBTYCq1e4ngRt20lSdqr/Food-Recipe?node-id=47%3A1273  

Requirements:
  - Flowchart Aplikasi
  - Table (Recipe, User, Comment)
  - CRUD
  - Comment by resep (opsional)
  - Resep by user (opsional)
  - Pencarian Resep berdasarkan nama
  - Resep terbaru maksimal 5
  - Pagination (opsional)
  - Linter
  - Error Handling
  - Cors
  - ENV
  - Dokumentasi Postman
  - Gunakan Bahasa Inggris untuk nama File dan Fungsi
  - Upload/push tugas kamu ke GitHub dan gunakan nama yang profesional
  - Dapat didemokan menggunakan postman
  - Presentasikan apa yang telah Anda lakukan dalam minggu ini
  - Jelaskan dengan bahasa kalian sendiri apa itu dan konsep tentang:
    - Node JS
    - Express
    - postgreSQL
    - REST API
  - Ceritakan dan Demokan tentang proyek ini
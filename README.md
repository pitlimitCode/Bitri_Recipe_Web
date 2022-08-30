### catatan edit
- logo utama, urlnya dari cloud sendiri
- sesuaikan dengan cv
- url postman?
- contributing?
- lisence buat apa?
- link deploy di "View Web Service" (BE)
- url deploy paling akhir untuk "Web Service" (BE) dan "Demo Bitri Recipe" (FE)

<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/pitlimitCode/Bitri_Recipe_Web/tree/FrontEnd+">
    <img src="https://lh3.googleusercontent.com/AUnVkYlLiu75LwM_KzpbV5nIq8I4rA6uqoLI-keYPMC6G7p7CAH3aXXsg3U5eaiO63i3uN_PNF3y3nk-0q6CEUT8xAn9fFzkjtvMtuAXDA-ynKrmemFP8oOREsfviSD2nNqbAoEDf-fbI3YzLXbxl1mDccduSLDcsPHaoZuCxC-o36_XPaO485MFoI1lnL2e5mHi-wEUfJpJz1tpzuF2EKZmhjgr3Vdae6Lz8fKT3amZfTSCdjufXBOJMVPVtmKPdD1kuzguty9uFlNVi33SWcpWQ8q_dv1ji1S8Y7K-qzvkO9g-tjuNT93YqlmIDf4K0vj3GhsiGbI6MSwtR5VaIPrbIswsTXGu0Pc0zoFHsVxlSyoNvr8JXXxGnLymENKGxUdZ8dWqEw8zKyim0o4cDMsPySCNQ9Cjd9LXBks_MCjG7pSjHHkZjQbdiMsf4sCNVC9SK0iY9UMjNAwmhuIMH2U0IM84l7bi3mlMpbOsRTdYvdCuQYj011mgaeVqiCzAxlbSPbK_kPyB6M6aUHUuJZLtc3ZQZMGQ0_a12-JyhQRKqHqM_uIPx-5UThleaPZQryGiRDJPZee8MQagbgxDBUPwUolIfT7wyUB0_47izt2oFjssaDjSTZrrI3WGBqZjSbD_viDLT5DVJdhA-pp5anNrTEpUgB1_76W9r-pc_gtQ72V_bEUJCaT0n4AbqDHA1w2oGt7T0XIRIy1MUsoO-HOLIpcCqKczqulGggU1BhfPh3Qemx657hxM8cGztt-p6mZ6zM93WTOPkr01_TkPOtCy4PyF60uSfFMY=w626-h625-no?authuser=1" alt="Logo" width="150px">
  </a>

  <h3 align="center">Bitri Recipe Backend</h3>

  <p align="center">
    Create a Node.js app for building Bitri Recipe RESTful APIs using Express.
    <br />
    <a href="#table-of-contents"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Web Service</a>
    ·
    <a href="https://github.com/pitlimitCode/Bitri_Recipe_Web/issues">Report Bug</a>
    ·
    <a href="https://github.com/pitlimitCode/Bitri_Recipe_Web/issues">Request Feature</a>
  </p>

</div>

<!-- TABLE OF CONTENTS -->
## Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
    <li><a href="#rest-api">REST API</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
Create a Node.js app for building Bitri Recipe RESTful APIs using Express.

### Built With
This app was built with some technologies below:
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- and other
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
This is an example of how to list things you need to use the software and how to install them.
* [Node.js](https://nodejs.org/en/download/)

### Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](https://www.postgresql.org/)

### Installation
- Clone the Repo
```
git clone -b FrontEnd+ https://github.com/pitlimitCode/Bitri_Recipe_Web.git
```
- Go To Folder Repo
```
cd Bitri_Recipe_Web
```
- Install Module
```
npm install
```
- Make a new database
- <a href="#setup-env-example">Setup .env</a>
- Type ` npm run dev ` To Start Development
- Type ` npm run start ` To Start Production

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example
Create .env file in your root project folder.

```env
# database
DB_PORT=
DB_HOST=
DB_NAME="SET_YOUR_POSTGRES_NAME"
DB_USER="SET_YOUR_POSTGRES_USERNAME"
DB_PASS=

# jwt
JWT_ALG=
JWT_KEY=
```
<p align="right">(<a href="#top">back to top</a>)</p>

## REST API
You can view my Postman collection [here](https://app.getpostman.com/join-team?invite_code=da9a8abdcba442fdfc6ea16e678e566a)
</br>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/)  
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourNewBranch`)
3. Commit your Changes (`git commit -m 'Add some YourNewBranch'`)
4. Push to the Branch (`git push origin feature/YourNewBranch`)
5. Open a Pull Request
<p align="right">(<a href="#top">back to top</a>)</p>

## Related Project
:rocket: [`Backend Bitri Recipe`](https://github.com/pitlimitCode/Bitri_Recipe_Web/tree/FrontEnd+)
:rocket: [`Frontend Bitri Recipe`](https://github.com/pitlimitCode/Bitri_Recipe_FrontEnd/tree/master)
:rocket: [`Web Service`](#)
:rocket: [`Demo Bitri Recipe`](#)
<p align="right">(<a href="#top">back to top</a>)</p>

## Contact
My Email : kristiadiprabowo@gmail.com
<p align="right">(<a href="#top">back to top</a>)</p>

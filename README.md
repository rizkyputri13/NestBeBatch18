<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ nest new <project-name>
```

## Running the app

```bash
# development
$ npm run start
$ yarn run start

# watch mode
$ npm run start:dev
$ yarn run start:dev

# production mode
$ npm run start:prod
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ npm run test
$ yarn run test

# e2e tests
$ npm run test:e2e
$ yarn run test:e2e

# test coverage
$ npm run test:cov
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Materi

Nest (NestJS) adalah kerangka kerja untuk membangun aplikasi sisi server Node.js yang efisien dan skalabel. Ini menggunakan JavaScript progresif, dibangun dengan dan sepenuhnya mendukung TypeScript (namun masih memungkinkan pengembang untuk membuat kode dalam JavaScript murni) dan menggabungkan elemen OOP (Pemrograman Berorientasi Objek), FP (Pemrograman Fungsional), dan FRP (Pemrograman Reaktif Fungsional).

Di bawah tenda, Nest menggunakan kerangka kerja Server HTTP yang kuat seperti Express (default) dan secara opsional dapat dikonfigurasi untuk menggunakan Fastify juga!

Nest menyediakan tingkat abstraksi di atas kerangka kerja Node.js umum ini (Express/Fastify), tetapi juga memaparkan API mereka langsung ke developer. Ini memberi pengembang kebebasan untuk menggunakan banyak sekali modul pihak ketiga yang tersedia untuk platform yang mendasarinya.

Dibagian src/main.ts disitu terdapat module NestFactory, module tersebut fungsinya hampir mirip dengan module Express di js.

AppModule merupakan tempat untuk mengatur import data mana saja yang akan dijalankan, disini untuk convert suatu database ke TypeScript di NestJs menggunakan bantuan dari TypeOrm dengan module typeorm-model-generator, nanti kalian bisa lihat formatnya di pacakage.json.

Dibagian server/controller/reg.con.ts disitu merupakan controller pembuatan api untuk bagian table region sebagai contoh, pertama disitu ada Controller yang berfungsi untuk membuat suatu api dasar, dan terdapat Injectable yang memungkinkan data di hasilnya itu di taruh di global dan dapat di akses secara umum, disitu terdapat Get,Post,Put,Delete, berfungsi untuk menentukan penggunakan code dibawahnya berfungsi untuk bagian apa, di TypeOrm untuk findAll menggunakan fungsi find(), untuk findOne masih sama, untuk Create data dia menggunakan fungsi Save, untuk Update masih sama tapi data hasil keluarnya tidak ada jadi harus di gandengan dengan findOne untuk melihat hasilnya, dan Delete disini tidak menggunakan Destroy tapi menggunakan fungsi delete, jadi didalam satu halaman ini terdapat controller dan reoute yang ada di expressJs.

Dibagian server/server.module.ts disitu merupakan tempat untuk memasukkan model yang akan di gunakan serta untuk fungsi bagian upload file/image, disitu juga ada controller untuk diisi controller mana yang akan di gunakan saat program berjalan.
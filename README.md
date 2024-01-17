# MakeOver

## Table of contents
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)

## Demo
- https://make-overr.netlify.app

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

## Features
- Authentication
- Browse Products
- Add to cart
- Check Out
- Card Payment
- Update user info
    - update profile image
    - update name
    - update registered email
    - update password
- Manage User Addresses
    - add new address
    - update a address
    - delete a address
- Admin Dashboard
    - add new product
    - update a product
    - delete a product
    - get all orders
    - update a order

## Technologies used
- [ReactJs + Vite](https://vitejs.dev/guide/) 
  - redux-toolkit
  - react-router-dom v6
- NodeJs
- ExpressJs
- MongoDb
- Stripe

## Getting started
### clone the repository
```bash
git clone https://github.com/AbhishekBhure/makeover.git
```
after cloning folder structure should look like this
![folder-structure](https://github.com/AbhishekBhure/makeOver-backend/assets/87894780/92bcd3bf-4721-459c-9eaa-5dbc9ea520f3)

Open any prefered code editor

In first terminal
```bash
cd server
```
And in second terminal
```bash
cd client
```

### Installation
Run
```bash
npm install
```

or

```bash
npm i
```
After installing all the dependencies.

**Add a .env file in both the directories to add environment variables**
**and change the environment variables accordingly**

run the below command in both the terminals

```bash
npm run dev
```

**After running the commands you'll get the following result**

**In first terminal**

Server running on port: PORT_NUMBER (add port number in .env).

Database Connected (change the mongoAtls url in .env).

**In second terminal**

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.





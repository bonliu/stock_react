# [Node.js](https://nodejs.org/en/)
**Node.js** is a JavaScript runtime environment combined with useful libraries. It is suitable for real-time web applications.
### Installation
```bash
pacman -S nodejs
```

There are LTS (Long Term Support) releases too:

```bash
pacman -S nodejs-lts-erbium # For 12.X version
pacman -S nodejs-lts-dubnium # For 10.X version
```

`nodejs-lts-erbium` is what I used.

# [npm](https://www.npmjs.com/) 
**npm** is the official package manager for node.js.
### Installation
```bash
pacman -S npm
```

* run `which npm` after installation. The output we are looking for is `/usr/bin/npm`

# [React](https://reactjs.org/)
**React** is a JavaScript library for building user interfaces.
> **Create React App** is a comfortable environment for **learning React**, and is the best way to start building **a new single-page application** in React.
### Installation
```bash
npx create-react-app client
cd client
npm start
```

Locate `package.json` in `client/` and add the following to the file.
```json
"proxy": "http://localhost:5000/",
```
# [Express.js](http://expressjs.com/)
**Express.js**, or simply **Express**, is a **web application framework** for **Node.js**

### Installation
```bash
touch server.js
npm init -y
npm install express --save
```

Modify package.json in the root directory to match the following:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "nodemon server.js"
},
```

`npm init` simpply generate an empty napm project without going through an interactive process. `-y` stands for yes, it tells the generator to use the defaults instead of asking questions.

# Git
**create-react-app** automatically run `git init` for you.
```bash
cd client/
rm -rf .git
cd ..
git init
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin master
```

# nodemon
A CLI (Command-line interface) utility that watches the file system for changes and automatically restarts the process.
### Installation (local)
```bash
npm install nodemon --save-dev
```

# [Handlebars](https://www.npmjs.com/package/express-handlebars)
```bash
npm install express-handlebars
mkdir views
touch views/index.handlebars
mkdir views/layouts
touch views/layouts/main.handlebars
```
Modify `views/layouts/main.handlebars` to match the following
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Main</title>
</head>
<body>
 
    {{{body}}}
 
</body>
</html>
```

# [sqlite3](https://www.npmjs.com/package/sqlite3)
SQLite is not a client-server database engine. Rather, it is embedded into the end program.
### Installation
```bash
npm install sqlite3 --save-dev
```

# [md5](https://preview.npmjs.com/package/md5)
I am using this JavaScript function to hash users' password.
### Installation
```bash
npm install md5 --save-dev # You might want to do this in client/
```

# [body-parser](https://www.npmjs.com/package/body-parser)
### Installation
```bash
npm install body-parser --save-dev
```

# react-router-dom
### Installation
```bash
npm install react-router-dom --save-dev
```
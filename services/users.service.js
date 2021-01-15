const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'text.json' );

class UsersService {
    usersList = [
        {
            id: '1',
            name: 'Kirill'
        },
        {
            id: '2',
            name: 'Slava'
        },
        {
            id: '3',
            name: 'Kostya'
        },
    ]

    getUsers = () => {
        this.writeFile();
        return this.usersList;
    }

    addUser = (user) => {
        this.usersList.push(user);
        this.writeFile();
        return this.usersList;
    }

    rewriteUsers = (userList) => {
        this.usersList = userList;
        this.writeFile();
        return this.usersList;
    }

    deleteUser = (id) => {
        this.usersList = this.usersList.filter(user => user.id !== id)
        this.writeFile();
        return this.usersList;
    }

    writeFile = () => {
        fs.writeFile(filePath, JSON.stringify(this.usersList), err => {
            if(err) {
                throw err
            }
        })
    }
}

module.exports = new UsersService();
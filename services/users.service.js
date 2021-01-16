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
        this.readFile();
        return this.usersList;
    }

    addUser = (user) => {
        this.readFile();
        this.usersList.push(user);
        this.writeFile();
        return this.usersList;
    }

    update = (dataToUpdate, id) => {
        this.readFile();
        const index  = this.usersList.findIndex(user => user.id === id);
        this.usersList[index] = {
            ...this.usersList[index],
            ...dataToUpdate,
        }
        this.writeFile();
        return this.usersList;
    }

    deleteUser = (id) => {
        this.readFile();
        this.usersList = this.usersList.filter(user => user.id !== id)
        this.writeFile();
        return this.usersList;
    }

    readFile = () => {
        let fileData = fs.readFileSync(filePath);
        let storageUsers = JSON.parse(fileData);
        this.usersList = storageUsers;
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
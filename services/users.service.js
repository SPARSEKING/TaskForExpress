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
        return this.usersList;
    }

    addUser = (user) => {
        this.usersList.push(user);
        return this.usersList;
    }

    rewriteUsers = (userList) => {
        this.usersList = userList;
        return this.usersList;
    }

    deleteUser = (id) => {
        this.usersList = this.usersList.filter(user => user.id !== id)
        return this.usersList;
    }
}

module.exports = new UsersService();
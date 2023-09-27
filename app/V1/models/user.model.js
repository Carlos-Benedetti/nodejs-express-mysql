const sql = require("./db.js");

// constructor
const User = function (user) {
    this.id = user.id;
    this.login = user.login;
    this.password_hash = user.password_hash;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.image_url = user.image_url;
    this.active = user.active;
    this.last_modified_date = user.last_modified_date;
};

User.create = (newUser) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
            if (err) {
                console.error("User.create: ", err);
                reject(err);
                return;
            }
            console.log(`User.create: created user with id ${res.insertId}`);
            resolve({ ...newUser, id: res.insertId });
        });
    })
};

User.findById = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
            if (err) {
                console.error("User.findById: ", err);
                reject(err);
            }
            if (res.length) {
                console.log(`User.findById: found user with id ${id}`);
                resolve(res[0]);
            }
            // não encontrol usuario com id
            reject({ kind: "not_found" });
        });
    })
};

User.getAll = () => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM user";

        sql.query(query, (err, res) => {
            if (err) {
                console.error("User.getAll: ", err);
                resolve(err);
                return;
            }

            console.log(`User.getAll found ${res.length} users`);
            reject(res);
        });
    })
};

User.updateById = (id, user) => {
    return new Promise((resolve, reject) => {
        sql.query(
            "UPDATE user SET login = ?, password_hash = ?, first_name = ?,last_name = ?,image_url = ?,active = ?,last_modified_date = ? WHERE id = ?",
            [user.login, user.password_hash, user.fisrt_name, user.last_name, user.image_url, user.active, new Date(), id],
            (err, res) => {
                if (err) {
                    console.error("User.updateById: ", err);
                    reject(err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // usuario com id não encontrado
                    reject({ kind: "not_found" });
                    return;
                }

                console.log(`User.updateById: updated user with id ${id}`);
                resolve({ id: id, ...user });
            }
        );
    })
};

User.removeById = (id) => {
    return new Promise((resolve, reject) => {
        sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
            if (err) {
                console.error("User.removeById: ", err);
                reject(err);
                return;
            }

            if (res.affectedRows == 0) {
                // usuario com id não encontrado
                reject({ kind: "not_found" });
                return;
            }
            console.log(`User.removeById: deleted user with id ${id}`);
            resolve(res);
        });
    })
};

User.removeAll = () => {
    return new Promise((resolve, reject) => {
        sql.query("DELETE FROM user", (err, res) => {
            if (err) {
                console.error("User.removeAll: ", err);
                reject(err);
                return;
            }

            console.log(`User.removeAll: deleted ${res.affectedRows} users`);
            resolve(`deleted ${res.affectedRows} users`);
        });
    })
};

module.exports = User;

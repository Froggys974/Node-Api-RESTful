const path = require("path");
const { Sequelize } = require("sequelize");
const envPath = path.resolve("", ".env");

require("dotenv").config({
    path: envPath 
});

class Database {
    static instance = null;

    constructor() {
        Database.instance = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
            host: process.env.HOST,
            dialect: process.env.DB_DIALECT
        });
    }

    static getInstance() {
        if (Database.instance === null) {
            new Database();
        }
        return Database.instance;
    }

    static async sync() {
        try {
            await this.getInstance().sync({ alter: true }); // Synchronisation des modèles
            console.log("Tables synchronisées avec succès");
        } catch (error) {
            console.error("Erreur lors de la synchronisation des tables:", error);
        }
    }
}

// Authentification et synchronisation des modèles
(async () => {
    try {
        await Database.getInstance().authenticate();
        await Database.sync(); // Appel de la méthode de synchronisation
        console.log("Connexion réussie à la base de données");
    } catch (error) {
        console.error("Erreur de connexion à la base de données:", error);
    }
})();

module.exports = Database;

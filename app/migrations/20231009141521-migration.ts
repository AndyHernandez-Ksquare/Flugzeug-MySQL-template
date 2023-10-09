import Sequelize from "sequelize";

/**
 * Actions summary:
 *
 * createTable "jwtblacklist", deps: []
 * createTable "user", deps: []
 * createTable "profile", deps: [user]
 *
 **/

const info = {
  revision: "20231009141521",
  name: "migration",
  created: "2023-10-09T18:15:21.803Z",
  comment: "",
};

const migrationCommands = [
  {
    fn: "createTable",
    params: [
      "jwtblacklist",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        token: {
          type: Sequelize.STRING(512),
          field: "token",
          allowNull: false,
        },
        expires: {
          type: Sequelize.DATE,
          field: "expires",
          defaultValue: null,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          defaultValue: null,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          validate: { isEmail: true },
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          validate: { isLength: { min: 8 } },
          allowNull: false,
        },
        role: {
          type: Sequelize.ENUM("user", "admin"),
          field: "role",
          defaultValue: "user",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "profile",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        time_zone: {
          type: Sequelize.STRING,
          field: "time_zone",
          defaultValue: null,
          allowNull: true,
        },
        locale: {
          type: Sequelize.ENUM("en", "es"),
          field: "locale",
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "user", key: "id" },
          allowNull: true,
          name: "userId",
          field: "userId",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
];

export default {
  up: async (queryInterface: Sequelize.QueryInterface) => {
    for (const command of migrationCommands) {
      console.log("Execute: " + command.fn);
      await queryInterface[command.fn](...command.params);
    }
  },
  info: info,
};

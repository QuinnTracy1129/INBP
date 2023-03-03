const e = require("express");

module.exports = ({}) =>
  async function (form, user, action = "update") {
    const { team, email, position, expiration, client } = form;

    var response = {};

    if (action === "create") {
      if (typeof client !== "string") {
        throw new Error("Invalid data type for Client ID!");
      }

      if (typeof team !== "string") {
        throw new Error("Invalid data type for Team!");
      }

      if (typeof position !== "string") {
        throw new Error("Invalid data type for Team!");
      }

      if (typeof expiration === "string") {
        const expTime = new Date(expiration).getTime();

        if (isNaN(expTime)) {
          throw new Error("Invalid Date of Expiration!");
        }
      } else {
        throw new Error("Invalid data type for Expiration!");
      }

      if (typeof email === "string") {
        var validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!email.match(validRegex)) {
          throw new Error("Invalid E-mail address!");
        }
      } else {
        throw new Error("Invalid data type for E-mail address!");
      }

      response = form;
      response.user = user;
    } else {
      if (client) {
        if (typeof client !== "string") {
          throw new Error("Invalid data type for Client ID!");
        } else {
          response.client = client;
        }
      }

      if (team) {
        if (typeof team !== "string") {
          throw new Error("Invalid data type for Team!");
        } else {
          response.team = team;
        }
      }

      if (position) {
        if (typeof position !== "string") {
          throw new Error("Invalid data type for Team!");
        } else {
          response.position = position;
        }
      }

      if (expiration) {
        if (typeof expiration === "string") {
          const expTime = new Date(expiration).getTime();

          if (isNaN(expTime)) {
            throw new Error("Invalid Date of Expiration!");
          } else {
            response.expiration = expiration;
          }
        } else {
          throw new Error("Invalid data type for Expiration!");
        }
      }

      if (email) {
        if (typeof email === "string") {
          var validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

          if (!email.match(validRegex)) {
            throw new Error("Invalid E-mail address!");
          } else {
            response.email = email;
          }
        } else {
          throw new Error("Invalid data type for E-mail address!");
        }
      }
    }

    return response;
  };

module.exports = ({}) =>
  async function (form) {
    const { email, password } = form;

    if (typeof email === "string") {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!email.match(validRegex)) {
        throw new Error("Invalid E-mail address!");
      }
    } else {
      throw new Error("Invalid data type for E-mail address!");
    }

    if (typeof password === "string") {
      if (password.length > 7) {
        var pattern = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );

        if (!pattern.test(password)) {
          throw new Error(
            "Password must contain at least 1 lowercase, 1 uppercase, 1 special character and 1 number!"
          );
        }
      } else {
        throw new Error("Password is too weak!");
      }
    } else {
      throw new Error("Invalid data type for Password!");
    }

    return form;
  };

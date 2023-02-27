module.exports = ({}) =>
  async function (form) {
    const { email, password } = form;

    if (email) {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!email.match(validRegex)) {
        throw new Error("Invalid E-mail address!");
      }
    }

    if (password) {
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
    }

    return form;
  };

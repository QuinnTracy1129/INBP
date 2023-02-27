module.exports = ({}) =>
  async function (form) {
    const { fullName, address, mobile, email, password } = form;

    if (typeof fullName === "object") {
      const { fname, lname } = fullName;

      if (typeof fname !== "string") {
        throw new Error("Invalid data type for First name!");
      }

      if (typeof lname !== "string") {
        throw new Error("Invalid data type for Last name!");
      }
    } else {
      throw new Error("Invalid data type for Fullname!");
    }

    if (typeof address === "object") {
      const { present, permanent } = address;

      if (typeof present !== "string") {
        throw new Error("Invalid data type for Present address!");
      }

      if (typeof permanent !== "string") {
        throw new Error("Invalid data type for Permanent address!");
      }
    } else {
      throw new Error("Invalid data type for Address!");
    }

    if (typeof mobile === "string") {
      if (mobile.length !== 10) {
        throw new Error("Invalid length for Mobile number!");
      }
    } else {
      throw new Error("Invalid data type for Mobile number!");
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

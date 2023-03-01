module.exports = ({}) =>
  async function (form) {
    const { fullName, mobile, nickname, dob, email, password } = form;

    if (typeof fullName === "object") {
      const { fname, mname, lname, suffix } = fullName;

      if (typeof fname !== "string") {
        throw new Error("Invalid data type for First name!");
      }

      if (mname && typeof mname !== "string") {
        throw new Error("Invalid data type for Middle name!");
      }

      if (typeof lname !== "string") {
        throw new Error("Invalid data type for Last name!");
      }

      if (suffix && typeof suffix !== "string") {
        throw new Error("Invalid data type for Suffix!");
      }
    } else {
      throw new Error("Invalid data type for Fullname!");
    }

    if (nickname && typeof nickname !== "string") {
      throw new Error("Invalid data type for Nickname!");
    }

    if (typeof mobile === "string") {
      const mobileTrim = mobile.trim();

      if (isNaN(Number(mobileTrim))) {
        throw new Error("Invalid Mobile number!");
      }

      if (mobileTrim.length !== 10) {
        throw new Error("Invalid length for Mobile number!");
      }
    } else {
      throw new Error("Invalid data type for Mobile number!");
    }

    if (typeof dob === "string") {
      const dobTime = new Date(dob).getTime();

      if (isNaN(dobTime)) {
        throw new Error("Invalid Date of birth!");
      }
    } else {
      throw new Error("Invalid data type for Date of birth!");
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

const registerEntity = ({}) =>
  async function (form) {
    const { fullName, mobile, email, password } = form;

    if (!fullName.fname) {
      throw new Error("Firstname is required!");
      //   return {
      //     error: "Firstname is required!",
      //   };
    }

    if (!fullName.lname) {
      return {
        error: "Lastname is required!",
      };
    }

    if (!mobile) {
      return {
        error: "Contact is required!",
      };
    }

    if (!email) {
      return {
        error: "E-mail address is required!",
      };
    }

    if (!password) {
      return {
        error: "Password is required!",
      };
    }

    return form;
  };

module.exports = registerEntity;

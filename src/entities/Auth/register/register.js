module.exports = ({}) =>
  async function (form) {
    const { fullName, address, mobile, email, password } = form;

    if (!fullName.fname) {
      throw new Error("Firstname is required!");
    }

    if (!fullName.lname) {
      throw new Error("Lastname is required!");
    }

    if (!address.present) {
      throw new Error("Firstname is required!");
    }

    if (!address.permanent) {
      throw new Error("Lastname is required!");
    }

    if (!mobile) {
      throw new Error("Contact is required!");
    }

    if (!email) {
      throw new Error("E-mail address is required!");
    }

    if (!password) {
      throw new Error("Password is required!");
    }

    return form;
  };

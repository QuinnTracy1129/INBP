module.exports = ({}) =>
  async function (form) {
    const { name, email } = form;

    if (name) {
      if (typeof name !== "string") {
        throw new Error("Invalid data type for Name!");
      }
    }

    if (email) {
      if (typeof email === "string") {
        var validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!email.match(validRegex)) {
          throw new Error("Invalid E-mail address!");
        }
      } else {
        throw new Error("Invalid data type for E-mail address!");
      }
    }

    return {
      name: name.toLowerCase(),
      email,
    };
  };

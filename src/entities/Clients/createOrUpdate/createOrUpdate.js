module.exports = ({}) =>
  async function (form, action = "update") {
    const { name, email } = form;

    if (action === "create") {
      if (typeof name !== "string") {
        throw new Error("Invalid data type for Name!");
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
    } else {
    }

    return {
      name: name.toLowerCase(),
      email,
    };
  };

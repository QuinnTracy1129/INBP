module.exports = ({}) =>
  async function (form) {
    const { id, password } = form;

    if (typeof id !== "string") {
      throw new Error("Invalid data type for ID!");
    }

    if (password) {
      if (password !== process.env.ASC_PASS) {
        throw new Error("Incorrect password!");
      }
    } else {
      throw new Error("Invalid password!");
    }

    return id;
  };

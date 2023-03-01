module.exports = ({}) =>
  async function (form) {
    const { id } = form;

    if (typeof id !== "string") {
      throw new Error("Invalid data type for ID!");
    }

    return id;
  };

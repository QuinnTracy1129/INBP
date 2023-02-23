module.exports = ({}) =>
  async function (form) {
    const { userId, name } = form;

    if (!userId) {
      throw new Error("User ID is required!");
    }

    if (!name) {
      throw new Error("Name is required!");
    }

    return form;
  };

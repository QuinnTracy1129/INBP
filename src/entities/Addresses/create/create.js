const validateAddress = (address, type) => {
  if (typeof address === "object") {
    const { street, baranggay, city, province, region, zipCode } = address;

    if (street && typeof street !== "string") {
      throw new Error(`Invalid data type for ${type} Street!`);
    }

    if (typeof baranggay !== "string") {
      throw new Error(`Invalid data type for ${type} Baranggay!`);
    }

    if (typeof city !== "string") {
      throw new Error(`Invalid data type for ${type} City!`);
    }

    if (typeof province !== "string") {
      throw new Error(`Invalid data type for ${type} Province!`);
    }

    if (typeof region !== "string") {
      throw new Error(`Invalid data type for ${type} Region!`);
    }

    if (isNaN(zipCode)) {
      throw new Error(`Invalid data type for ${type} Zip Code!`);
    }
  } else {
    throw new Error(`Invalid data type for ${type} Address!`);
  }
};

module.exports = ({}) =>
  async function (form, user) {
    const { current, permanent, gmap } = form;

    validateAddress(current, "Current");
    validateAddress(permanent, "Permanent");

    if (typeof gmap !== "string") {
      throw new Error("Invalid data type for Google Map!");
    }

    return { ...form, user };
  };

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

    if (isNaN(Number(zipCode))) {
      throw new Error(`Invalid data type for ${type} Zip Code!`);
    }
  } else {
    throw new Error(`Invalid data type for ${type} Address!`);
  }
};

module.exports = ({}) =>
  async function (form, user, action = "update") {
    const { current, permanent, gmap } = form;

    var response = {};

    if (action === "create") {
      validateAddress(current, "Current");
      validateAddress(permanent, "Permanent");

      if (typeof gmap !== "string") {
        throw new Error("Invalid data type for Google Map!");
      }

      response = form;
    } else {
      if (current) {
        validateAddress(current, "Current");
        response.current = current;
      }

      if (permanent) {
        validateAddress(permanent, "Permanent");
        response.permanent = permanent;
      }

      if (gmap && typeof gmap !== "string") {
        throw new Error("Invalid data type for Google Map!");
      } else {
        response.gmap = gmap;
      }
    }

    return response;
  };
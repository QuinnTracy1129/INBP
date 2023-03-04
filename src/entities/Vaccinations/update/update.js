const vaccines = require("../../../fakeDb/vaccines");

const validateDetails = (data, type) => {
  const { location, date } = data;

  if (typeof location !== "string") {
    throw new Error(`Invalid data type for ${type} Location!`);
  }

  if (typeof date === "string") {
    const dateTime = new Date(date).getTime();

    if (isNaN(dateTime)) {
      throw new Error(`Invalid Date for ${type} Date!`);
    }
  } else {
    throw new Error(`Invalid data type for ${type} Date!`);
  }
};

const daysDiff = (first, second) => {
  const date1 = new Date(first),
    date2 = new Date(second);

  const diffInMS = Math.abs(date2 - date1);
  return Math.floor(diffInMS / 86400000);
};

module.exports = ({}) =>
  async function (form, key, old) {
    const { vaccineIndex, initial, sequel, booster, emergency } = form;

    var response = {},
      _vaccineIndex;

    if (vaccineIndex) {
      if (isNaN(vaccineIndex)) {
        throw new Error("Invalid data type for Vaccine Index!");
      }

      if (vaccineIndex > vaccines.length - 1) {
        throw new Error("Invalid Vaccine Index!");
      }

      _vaccineIndex = vaccineIndex;
    } else {
      _vaccineIndex = old.vaccineIndex;
    }

    var vaccine = vaccines[_vaccineIndex];

    switch (key) {
      case "sequel":
        if (typeof sequel === "object") {
          if (!vaccine.isSingle) {
            validateDetails(sequel);

            const dateDiff = daysDiff(old.initial.date, sequel.date);

            if (dateDiff < vaccine.interval) {
              throw new Error(
                `Invalid Vaccine Interval, ${vaccine.name} requires ${vaccine.interval} days interval!`
              );
            }

            response.sequel = sequel;
          } else {
            throw new Error(
              `Invalid sequel, ${vaccine.name} does not require second shot`
            );
          }
        } else {
          throw new Error("Invalid data type for Sequel!");
        }
        break;

      case "booster":
        if (typeof booster === "object") {
          validateDetails(booster);

          if (!vaccine.isSingle) {
            if (old.sequel.date) {
              const dateDiff = daysDiff(old.sequel.date, booster.date);

              if (dateDiff < 90) {
                throw new Error(
                  "Invalid Booster Interval, booster shot required at least 90 days of second shot!"
                );
              }
            } else {
              throw new Error("Cannot update Booster without setting Sequel!");
            }
          } else {
            const dateDiff = daysDiff(old.initial.date, booster.date);

            if (dateDiff < 90) {
              throw new Error(
                "Invalid Booster Interval, booster shot required at least 90 days of first shot!"
              );
            }
          }
          response.booster = booster;
        } else {
          throw new Error("Invalid data type for Booster!");
        }
        break;

      default:
        throw new Error("Invalid key!");
    }

    return response;
  };

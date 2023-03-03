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
  async function (form, old) {
    const { vaccineIndex, initial, sequel, booster, emergency } = form;

    const _vaccineIndex = vaccineIndex ? vaccineIndex : old.vaccineIndex;

    const vaccine = vaccines[_vaccineIndex];

    if (vaccineIndex) {
      if (isNaN(vaccineIndex)) {
        throw new Error("Invalid data type for Vaccine Index!");
      }

      if (vaccineIndex > vaccines.length - 1) {
        throw new Error("Invalid Vaccine Index!");
      }
    }

    if (initial) {
      if (typeof initial === "object") {
        validateDetails(initial);

        if (sequel) {
          if (!vaccine.isSingle) {
            if (typeof sequel === "object") {
              validateDetails(sequel);

              const dateDiff = daysDiff(initial.date, sequel.date);

              if (dateDiff < vaccine.interval) {
                throw new Error(
                  `Invalid Vaccine Interval, ${vaccine.name} requires ${vaccine.interval} days interval!`
                );
              }
            } else {
              throw new Error("Invalid data type for Sequel!");
            }
          } else {
            throw new Error(
              `Invalid sequel, ${vaccine.name} does not require second shot`
            );
          }
        }

        if (booster) {
          if (typeof booster === "object") {
            validateDetails(booster);
            if (vaccine.isSingle) {
              const dateDiff = daysDiff(initial.date, booster.date);

              if (dateDiff < 90) {
                throw new Error(
                  "Invalid Booster Interval, booster shot required at least 90 days of first shot!"
                );
              }
            } else {
              if (sequel) {
                const dateDiff = daysDiff(sequel.date, booster.date);

                if (dateDiff < 90) {
                  throw new Error(
                    "Invalid Booster Interval, booster shot required at least 90 days of second shot!"
                  );
                }
              } else {
                throw new Error(
                  "Cannot submit Booster details without having second shot!"
                );
              }
            }
          } else {
            throw new Error("Invalid data type for Booster!");
          }
        }

        if (!vaccine.isSingle) {
          if (old.sequel) {
            const dateDiff = daysDiff(initial.date, old.sequel.date);

            if (dateDiff < vaccine.interval) {
              throw new Error(
                `Invalid Vaccine Interval, ${vaccine.name} requires ${vaccine.interval} days interval!`
              );
            }
          }
        } else {
          if (old.booster) {
            const dateDiff = daysDiff(initial.date, old.booster.date);

            if (dateDiff < 90) {
              throw new Error(
                "Invalid Booster Interval, booster shot required at least 90 days of first shot!"
              );
            }
          }
        }
      } else {
        throw new Error("Invalid data type for Initial!");
      }
    }

    if (sequel) {
      if (!vaccine.isSingle) {
        if (typeof sequel === "object") {
          validateDetails(sequel);

          const dateDiff = daysDiff(initial.date, sequel.date);

          if (dateDiff < vaccine.interval) {
            throw new Error(
              `Invalid Vaccine Interval, ${vaccine.name} requires ${vaccine.interval} days interval!`
            );
          }
        } else {
          throw new Error("Invalid data type for Sequel!");
        }
      } else {
        throw new Error(
          `Invalid sequel, ${vaccine.name} does not require second shot`
        );
      }
    }

    if (emergency) {
      if (typeof emergency === "object") {
        const { person, mobile } = emergency;

        if (typeof person !== "string") {
          throw new Error("Invalid data type for Emergency Person!");
        }

        if (typeof mobile === "string") {
          const mobileTrim = mobile.trim();

          if (isNaN(Number(mobileTrim))) {
            throw new Error("Invalid Emergency Mobile!");
          }

          if (mobileTrim.length !== 10) {
            throw new Error("Invalid length for Emergency Mobile!");
          }
        } else {
          throw new Error("Invalid data type for Emergency Mobile!");
        }
      } else {
        throw new Error("Invalid data type for Emergency!");
      }
    }

    return {
      ...form,
      user,
    };
  };

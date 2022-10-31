/* eslint-disable max-len */
// eslint-disable-next-line new-cap
const router = require("express").Router();
const shortid = require("shortid");
shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$");

router.get("/create", (req, res) => {
  const greyhounds = [];

  /*
    Distances
  */
  const distancesRandom = Math.floor(Math.random() * 101);
  let distanceSelected;
  if (distancesRandom <= 60) {
    distanceSelected = "515";
  } else if (distancesRandom >= 61 && distancesRandom <= 91) {
    distanceSelected = "595";
  } else {
    distanceSelected = "715";
  }
  const dogIdealDistance = distanceSelected;

  /*
    Temperament
  */
  const temperamentRandom = Math.floor(Math.random() * 101);
  let temperamentSelected;
  if (temperamentRandom <= 50) {
    temperamentSelected = "Average";
  } else if (temperamentRandom >= 51 && temperamentRandom <= 71) {
    temperamentSelected = "Nervous";
  } else {
    temperamentSelected = "Relaxed";
  }
  const temperament = temperamentSelected;

  /*
    Colour
  */
  const colours = [
    "BLK",
    "BKW",
    "WBK",
    "BLW",
    "B",
    "BL",
    "F",
    "FWH",
  ];
  const dogColour = colours[Math.floor(Math.random() * colours.length)];

  /*
    Potential Ability and Actual Ability
  */
  const potentialArray = [];
  const actualArray = [];

  for (let i = 0; i < 4; i++) {
    const actual = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    let potential;
    if (actual === 20) {
      // if dogs actual is 20 then they can't improve
      potential = actual;
    } else {
      // if the dogs actual is less that 20 they can improve to the limit of 20
      let diff = Math.floor(Math.random() * (19 - actual + 1)) + 1;
      if (diff > 5) {
        // if the random number diff generated is more than 5 limit it to 5
        diff = 5;
      }
      // dogs potential will not go past 20 and not be more than 5
      potential = parseInt(actual + diff);
    }
    actualArray.push(actual);
    potentialArray.push(potential);
  }

  const dogActualStrength = actualArray[0];
  const dogPotentialStrength = potentialArray[0];

  const dogActualMiddle = actualArray[1];
  const dogPotentialMiddle = potentialArray[1];

  const dogActualEarly = actualArray[2];
  const dogPotentialEarly = potentialArray[2];

  const dogActualTrackcraft = actualArray[3];
  const dogPotentialTrackcraft = potentialArray[3];

  /*
    Draw
  */
  const draws = [
    "R",
    "M",
    "W",
  ];
  const dogIdealDraw = draws[Math.floor(Math.random() * draws.length)];

  /*
    Conditions
  */
  const conditions = [
    "Fast",
    "Normal",
    "Slow",
  ];
  const dogIdealConditions = conditions[Math.floor(Math.random() * conditions.length)];

  /*
    Dog injury proneness
  */
  const dogInjuryProneness = Math.floor(Math.random() * (12 - 1 + 1)) + 1;

  /*
    Dog fitness
  */
  const dogFitness = Math.floor(Math.random() * (100 - 75 + 1)) + 75;

  /*
    Dog total actual ability
  */
  const dogAbility = dogActualStrength + dogActualMiddle + dogActualEarly + dogActualTrackcraft;

  /*
    Time calculation
  */
  let addTime;

  /*
    Sex choice
  */
  let dogSex;

  /*
    Calculation
  */
  let abilityVsPoints;
  let dogsTime;
  let ability;
  let consistency;
  let dogSecondDistance;
  let dogThirdDistance;
  let dogFirstSectional;
  let dogRunHome;


  let timePerPointLower;
  let averageLowerTime;
  let averageUpperTime;
  let timePerPointMiddle;
  let averageMiddleTime;
  let timePerPointUpper;
  let timePerPointElite;
  let averageEliteTime;

  if (dogIdealDistance === 515) {
    averageEliteTime = 29.98;
    averageLowerTime = 30.08;
    averageMiddleTime = 30.41;
    averageUpperTime = 30.83;
    timePerPointElite = 0.010;
    timePerPointUpper = 0.008;
    timePerPointMiddle = 0.005;
    timePerPointLower = 0.002;
  } else if (dogIdealDistance === 595) {
    averageEliteTime = 34.65;
    averageLowerTime = 34.80;
    averageMiddleTime = 35.09;
    averageUpperTime = 35.48;
    timePerPointElite = 0.010;
    timePerPointUpper = 0.008;
    timePerPointMiddle = 0.005;
    timePerPointLower = 0.002;
  } else {
    averageEliteTime = 42.10;
    averageLowerTime = 42.36;
    averageMiddleTime = 42.71;
    averageUpperTime = 45.30;
    timePerPointElite = 0.010;
    timePerPointUpper = 0.008;
    timePerPointMiddle = 0.005;
    timePerPointLower = 0.002;
  }

  // this is what each point from 24 to 80 is worth taking the average time and reducting it
  if (dogAbility <= 24) {
    // Low ability
    abilityVsPoints = timePerPointLower * dogAbility;
    dogsTime = parseFloat(averageUpperTime - abilityVsPoints).toFixed(2);
    addTime = 0.008;
    ability = "Low";
    consistency = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

    // the distance and ability affects the sex
    if (dogIdealDistance === 515) {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 50) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances - always going to be 595,715
      dogSecondDistance = "595";
      dogThirdDistance = "715";

      // lets work out the sectionals
      if (dogActualEarly > 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (25 - 17 + 1)) + 17;
        dogFirstSectional = 5 + "." + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (32 - 17 + 1)) + 17;
        dogFirstSectional = 5 + "." + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength > 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (63 - 60 + 1)) + 60;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (85 - 63 + 1)) + 63;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      }
    } else if (dogIdealDistance === 595) {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 50) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances, depending on the strength and early pace
      if (dogPotentialStrength < dogPotentialEarly) {
        dogSecondDistance = "515";
        dogThirdDistance = "715";
      } else {
        dogSecondDistance = "715";
        dogThirdDistance = "515";
      }
      // lets work out the sectionals
      if (dogActualEarly > 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (35 - 17 + 1)) + 17;
        dogFirstSectional = 9 + "." + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (45 - 30 + 1)) + 30;
        dogFirstSectional = 9 + "." + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength > 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (10 - 15 + 1)) + 15;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (12 - 21 + 1)) + 21;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      }
    } else {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 50) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances, can only be one down
      dogSecondDistance = "595";
      dogThirdDistance = "515";
      // lets work out the sectionals
      if (dogActualEarly > 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (45 - 35 + 1)) + 35;
        dogFirstSectional = 6 + "." + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (60 - 40 + 1)) + 40;
        dogFirstSectional = 6 + "." + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength > 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (75 - 60 + 1)) + 60;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (90 - 70 + 1)) + 70;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      }
    }
  } else if (dogAbility >= 25 && dogAbility <= 48) {
    // Average ability
    abilityVsPoints = timePerPointMiddle * dogAbility;
    dogsTime = parseFloat(averageMiddleTime - abilityVsPoints).toFixed(2);
    addTime = 0.010;
    ability = "Average";
    consistency = Math.floor(Math.random() * (20 - 9 + 1)) + 9;

    // the distance and ability affects the sex
    if (dogIdealDistance === 515) {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 50) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances - always going to be 595,715
      dogSecondDistance = "595";
      dogThirdDistance = "715";

      // lets work out the sectionals
      if (dogActualEarly > 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (20 - 13 + 1)) + 13;
        dogFirstSectional = 5 + "." + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (27 - 14 + 1)) + 14;
        dogFirstSectional = 5 + "." + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength > 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (63 - 54 + 1)) + 54;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (85 - 57 + 1)) + 57;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      }
    } else if (dogIdealDistance === 595) {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 50) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances, depending on the strength and early pace
      if (dogPotentialStrength < dogPotentialEarly) {
        dogSecondDistance = "515";
        dogThirdDistance = "715";
      } else {
        dogSecondDistance = "715";
        dogThirdDistance = "515";
      }
      // lets work out the sectionals
      if (dogActualEarly > 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (30 - 20 + 1)) + 25;
        dogFirstSectional = 9 + "." + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (40 - 25 + 1)) + 25;
        dogFirstSectional = 9 + "." + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength > 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (99 - 97 + 1)) + 97;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (9 - 4 + 1)) + 4;
        dogRunHome = 11 + ".0" + dogRunHomeSectional2;
      }
    } else {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 50) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances, can only be one down
      dogSecondDistance = "595";
      dogThirdDistance = "515";
      // lets work out the sectionals
      if (dogActualEarly > 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
        dogFirstSectional = 6 + "." + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (50 - 40 + 1)) + 50;
        dogFirstSectional = 6 + "." + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength > 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (80 - 70 + 1)) + 70;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (90 - 80 + 1)) + 80;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      }
    }
  } else if (dogAbility >= 49 && dogAbility <= 72) {
    // High dog!
    abilityVsPoints = timePerPointUpper * dogAbility;
    dogsTime = parseFloat(averageLowerTime - abilityVsPoints).toFixed(2);
    addTime = 0.012;
    ability = "High";
    consistency = Math.floor(Math.random() * (20 - 13 + 1)) + 13;

    // the distance and ability affects the sex
    if (dogIdealDistance === 515) {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 17) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances - always going to be 595,715
      dogSecondDistance = "595";
      dogThirdDistance = "715";

      // lets work out the run home
      if (dogActualStrength <= 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (67 - 57 + 1)) + 57;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else if (dogActualStrength >= 16 && dogActualStrength <= 19) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (57 - 47 + 1)) + 47;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (47 - 42 + 1)) + 42;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      }

      // lets work out the sectionals
      if (dogActualEarly <= 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (20 - 13 + 1)) + 13;
        dogFirstSectional = 5 + "." + dogsFirstSectional2;
      } else if (dogActualEarly >= 16 && dogActualEarly <= 18) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (9 - 5 + 1)) + 5;
        dogFirstSectional = 5 + ".0" + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (99 - 97 + 1)) + 97;
        dogFirstSectional = 4 + "." + dogsFirstSectional2;
      }
    } else if (dogIdealDistance === 595) {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 25) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances, depending on the strength and early pace
      if (dogPotentialStrength < dogPotentialEarly) {
        dogSecondDistance = "515";
        dogThirdDistance = "715";
      } else {
        dogSecondDistance = "715";
        dogThirdDistance = "515";
      }
      // lets work out the run home
      if (dogActualStrength <= 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        dogRunHome = 11 + ".0" + dogRunHomeSectional2;
      } else if (dogActualStrength >= 16 && dogActualStrength <= 19) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (95 - 88 + 1)) + 88;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (88 - 83 + 1)) + 83;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      }

      // lets work out the sectionals
      if (dogActualEarly <= 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        dogFirstSectional = 9 + "." + dogsFirstSectional2;
      } else if (dogActualEarly >= 16 && dogActualEarly <= 18) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
        dogFirstSectional = 9 + "." + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (9 - 4 + 1)) + 4;
        dogFirstSectional = 9 + ".0" + dogsFirstSectional2;
      }
    } else {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 50) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances, can only be one down
      dogSecondDistance = "595";
      dogThirdDistance = "515";

      // lets work out the sectionals
      if (dogActualEarly <= 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
        dogFirstSectional = 6 + "." + dogsFirstSectional2;
      } else if (dogActualEarly >= 16 && dogActualEarly <= 19) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
        dogFirstSectional = 6 + "." + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        dogFirstSectional = 6 + "." + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength <= 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (70 - 60 + 1)) + 60;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      } else if (dogActualStrength >= 16 && dogActualStrength <= 19) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (60 - 45 + 1)) + 45;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      }
    }
  } else {
    // Elite dog!
    abilityVsPoints = timePerPointElite * dogAbility;
    dogsTime = parseFloat(averageEliteTime - abilityVsPoints).toFixed(2);
    addTime = 0.014;
    ability = "Elite";
    consistency = Math.floor(Math.random() * (20 - 17 + 1)) + 17;

    // the distance and ability affects the sex
    if (dogIdealDistance === 515) {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 5) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances - always going to be 595,715
      dogSecondDistance = "595";
      dogThirdDistance = "715";

      // lets work out the sectionals
      if (dogActualEarly <= 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
        dogFirstSectional = 5 + "." + dogsFirstSectional2;
      } else if (dogActualEarly >= 16 && dogActualEarly <= 19) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
        dogFirstSectional = 5 + ".0" + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (99 - 95 + 1)) + 95;
        dogFirstSectional = 4 + "." + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength <= 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (55 - 50 + 1)) + 50;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else if (dogActualStrength >= 16 && dogActualStrength <= 19) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (50 - 45 + 1)) + 45;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (45 - 40 + 1)) + 40;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      }
    } else if (dogIdealDistance === 595) {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 25) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances, depending on the strength and early pace
      if (dogPotentialStrength < dogPotentialEarly) {
        dogSecondDistance = "515";
        dogThirdDistance = "715";
      } else {
        dogSecondDistance = "715";
        dogThirdDistance = "515";
      }

      // lets work out the sectionals
      if (dogActualEarly <= 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
        dogFirstSectional = 9 + "." + dogsFirstSectional2;
      } else if (dogActualEarly >= 16 && dogActualEarly <= 19) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (9 - 4 + 1)) + 4;
        dogFirstSectional = 9 + ".0" + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        dogFirstSectional = 9 + ".0" + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength <= 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (99 - 95 + 1)) + 95;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else if (dogActualStrength >= 16 && dogActualStrength <= 19) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (95 - 85 + 1)) + 85;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (85 - 80 + 1)) + 80;
        dogRunHome = 10 + "." + dogRunHomeSectional2;
      }
    } else {
      const sex = Math.floor(Math.random() * 101);
      if (sex <= 50) {
        dogSex = "F";
      } else {
        dogSex = "M";
      }
      // lets work out the other distances, can only be one down
      dogSecondDistance = "595";
      dogThirdDistance = "515";

      // lets work out the sectionals
      if (dogActualEarly <= 15) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
        dogFirstSectional = 6 + "." + dogsFirstSectional2;
      } else if (dogActualEarly >= 16 && dogActualEarly <= 19) {
        const dogsFirstSectional2 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        dogFirstSectional = 6 + "." + dogsFirstSectional2;
      } else {
        const dogsFirstSectional2 = Math.floor(Math.random() * (1 - 9 + 1)) + 9;
        dogFirstSectional = 6 + ".0" + dogsFirstSectional2;
      }

      // lets work out the run home
      if (dogActualStrength <= 15) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (50 - 40 + 1)) + 40;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      } else if (dogActualStrength >= 16 && dogActualStrength <= 19) {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      } else {
        const dogRunHomeSectional2 = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
        dogRunHome = 11 + "." + dogRunHomeSectional2;
      }
    }
  }

  const strengthTimeImp = (dogPotentialStrength - dogActualStrength) * addTime;
  const middleTimeImp = (dogPotentialMiddle - dogActualMiddle) * addTime;
  const earlyTimeImp = (dogPotentialEarly - dogActualEarly) * addTime;
  const trackcraftTimeImp = (dogPotentialTrackcraft - dogActualTrackcraft) * addTime;
  // weight will always be 5 because we're always 0.50 heavier or lighter than ideal
  const weightTimeImp = addTime * 5;
  const potDogFirstSectional = dogFirstSectional - 0.05;
  const potDogRunHome = dogRunHome - 0.08;
  const fitnessTimeImp = (100 - dogFitness) * addTime;
  const caculatedTimeImp =
            parseFloat(strengthTimeImp) +
            parseFloat(middleTimeImp) +
            parseFloat(earlyTimeImp) +
            parseFloat(trackcraftTimeImp) +
            parseFloat(weightTimeImp) +
            parseFloat(fitnessTimeImp);

  const improvementToCome = caculatedTimeImp.toFixed(2);
  const bestTime = parseFloat(dogsTime - improvementToCome).toFixed(2);

  // generating the weight actual upper and lower limit
  let dogActualWeight = null;
  let dogWeightPlus = null;
  let dogWeightLess = null;
  const dogWeightVariation = parseFloat(0.50).toFixed(2);
  const dogUpperLower = [];
  let dogIdealWeight = null;

  const averageWeights = [
    0,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
  ];

  const weightTwo = averageWeights[Math.floor(Math.random() * averageWeights.length)];
  let weightOne;

  if (dogSex == "M") {
    weightOne = (Math.floor(Math.random() * (36 - 28 + 1)) + 28);
  }

  if (dogSex == "F") {
    weightOne = (Math.floor(Math.random() * (30 - 22 + 1)) + 22);
  }

  dogActualWeight = weightOne + "." + weightTwo;
  dogWeightPlus = parseFloat(dogActualWeight) + 0.50;
  dogWeightLess = parseFloat(dogActualWeight - dogWeightVariation);
  dogUpperLower.push(dogWeightPlus, dogWeightLess);
  dogIdealWeight = dogUpperLower[Math.floor(Math.random() * dogUpperLower.length)].toFixed(2);

  const now = new Date();
  const today = new Date().toISOString();
  const dor = new Date(now.setMonth(now.getMonth() + 6)).toISOString();

  greyhounds.push({
    microchip: shortid.generate(),
    dob: today,
    dor: dor,
    bredAbility: dogAbility,
    levelOfAbility: ability,
    bredTime: dogsTime,
    currentTime: dogsTime,
    currentTimeFirstSectional: dogFirstSectional,
    currentTimeRunHome: dogRunHome,
    potentialTime: bestTime,
    potentialTimeFirstSectional: potDogFirstSectional,
    potentialTimeRunHome: potDogRunHome,
    colour: dogColour,
    sex: dogSex,
    sire: "Genesis",
    dam: "Genesis",
    actualWeight: dogActualWeight,
    actualStrength: dogActualStrength,
    actualEarly: dogActualEarly,
    actualMiddle: dogActualMiddle,
    actualTrackcraft: dogActualTrackcraft,
    idealWeight: dogIdealWeight,
    potentialStrength: dogPotentialStrength,
    potentialEarly: dogPotentialEarly,
    potentialMiddle: dogPotentialMiddle,
    potentialTrackcraft: dogPotentialTrackcraft,
    idealDraw: dogIdealDraw,
    idealDistance: dogIdealDistance,
    secondDistance: dogSecondDistance,
    thirdDistance: dogThirdDistance,
    idealConditions: dogIdealConditions,
    injuryProneness: dogInjuryProneness,
    consistency: consistency,
    fitness: dogFitness,
    temperament: temperament,
    injured: "N",
    createdAt: today,
    updatedAt: today,
  });
  res.send(greyhounds);
});

module.exports = router;
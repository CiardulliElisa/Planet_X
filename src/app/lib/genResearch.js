function genResearch(map) {

  let researches = [];
  let isDuplicate = true;
  let count = 0;

  while (isDuplicate || count < 2) {
    isDuplicate = true;
    let newResearch = findCouple(map);
    if (!researches.includes(newResearch)) {
      researches.push(newResearch);
      isDuplicate = false;
      count++;
    }
  }

  isDuplicate = true;
  count = 0;

  while (isDuplicate || count < 4) {
    isDuplicate = true;
    let newResearch = findRange(map);
    if (!researches.includes(newResearch)) {
      researches.push(newResearch);
      isDuplicate = false;
      count++;
    }
  }

  shuffleArray(researches);

  researches.push(findPlanetX(map));

  return researches;

}

//find planet X related pattern
function findPlanetX(map) {
  const planetXIndex = map.indexOf('planet X');
  const randomInt = Math.floor(Math.random() * 2) + 1;
  const direction = Math.random() < 0.5 ? -randomInt : randomInt;
  const adjacentIndex = (planetXIndex + direction + map.length) % map.length;
  if (randomInt == 1) {
    return `there is one ${map[adjacentIndex]} adjacent to Planet X.`;
  } else {
    return `there is one ${map[adjacentIndex]} within ${randomInt} sectors of Planet X.`;
  }
}

//finds couples in range greater than 1
function findRange(map) {
  let message = "";
  let adjacentObj = "planet X";
  const mainIndex = getRandomIndex(map);

  while (adjacentObj === 'planet X') {
    let randomInt = Math.floor(Math.random() * 6) + 2;
    let direction = Math.random() < 0.5 ? -(randomInt) : randomInt;
    let adjacentIndex = (mainIndex + direction + map.length) % map.length;
    message = `there is one ${map[mainIndex]} within ${randomInt} sectors of one ${map[adjacentIndex]}.`;
    adjacentObj = map[adjacentIndex];
  }
  return message;
}

//finds couple of celestial bodies
function findCouple(map) {
  let message = "";
  const mainIndex = getRandomIndex(map);
  let adjacentObj = "planet X";

  while (adjacentObj === 'planet X') {
    let direction = Math.random() < 0.5 ? -1 : 1;
    let adjacentIndex = (mainIndex + direction + map.length) % map.length;
    message = `at least one ${map[mainIndex]} is adjacent to one ${map[adjacentIndex]}.`;
    adjacentObj = map[adjacentIndex];
  }

  return message;

}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomIndex(map) {
  const planetXIndex = map.indexOf('planet X');
  let index = planetXIndex;
  while (index === planetXIndex) {
    index = Math.floor(Math.random() * map.length);
  }
  return index;
}

export default genResearch;
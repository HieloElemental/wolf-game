const character = document.getElementById("character");
const bg = document.getElementById("bg");
const object = document.getElementById("object");

let facing = "down";
let objectPositionX = 0;
let objectPositionY = 0;
const objectStep = 1.8;

const keysPressed = {
  87: { isPressed: false, isPrincipal: false, queue: 1 },
  83: { isPressed: false, isPrincipal: false, queue: 1 },
  65: { isPressed: false, isPrincipal: false, queue: 1 },
  68: { isPressed: false, isPrincipal: false, queue: 1 },
};

const faceTo = (direction) => {
  facing = direction;
  character.classList.remove(
    "facing-up",
    "facing-down",
    "facing-left",
    "facing-right"
  );
  character.classList.add(`facing-${facing}`);
};

const moveObject = () => {
  if (keysPressed[87].isPressed && keysPressed[87].isPrincipal) {
    faceTo("up");
    character.classList.add("run-up");
    bg.classList.add("bg-down");
    objectPositionY += objectStep;
  } else if (keysPressed[83].isPressed && keysPressed[83].isPrincipal) {
    faceTo("down");
    character.classList.add("run-down");
    bg.classList.add("bg-up");
    objectPositionY -= objectStep;
  } else if (keysPressed[65].isPressed && keysPressed[65].isPrincipal) {
    faceTo("left");
    character.classList.add("run-left");
    bg.classList.add("bg-right");
    objectPositionX += objectStep;
  } else if (keysPressed[68].isPressed && keysPressed[68].isPrincipal) {
    faceTo("right");
    character.classList.add("run-right");
    bg.classList.add("bg-left");
    objectPositionX -= objectStep;
  }

  object.style.transform = `translate(${objectPositionX}px, ${objectPositionY}px)`;
  requestAnimationFrame(moveObject);
};

const resetPrincipal = () => {
  Object.entries(keysPressed).forEach((entry) => {
    keysPressed[entry[0]].isPrincipal = false;
  });
};

const queueUp = (value) => {
  Object.entries(keysPressed).forEach((entry) => {
    keysPressed[entry[0]].queue += value;
  });
};

const getFirstPressedInQueue = () => {
  let firstPressedInQueue = { key: null, queue: 5 };
  Object.entries(keysPressed).forEach((entry) => {
    if (entry[1].isPressed && entry[1].queue < firstPressedInQueue.queue) {
      firstPressedInQueue.key = entry[0];
    }
  });
  return firstPressedInQueue.key;
};

document.addEventListener("keydown", async (event) => {
  const keyCode = event.keyCode;

  if (!keysPressed[keyCode].isPressed) {
    bg.classList.remove("bg-down", "bg-up", "bg-left", "bg-right");
    character.classList.remove("run-up", "run-down", "run-left", "run-right");
    await resetPrincipal();
    queueUp(1);
    keysPressed[keyCode] = { isPressed: true, isPrincipal: true, queue: 0 };
  }
});

document.addEventListener("keyup", (event) => {
  const keyCode = event.keyCode;
  keysPressed[keyCode] = { isPressed: false, isPrincipal: false, queue: 1 };
  try {
    keysPressed[getFirstPressedInQueue()].isPrincipal = true;
    queueUp(-1);
  } catch (e) { }

  character.classList.remove("run-up", "run-down", "run-left", "run-right");
  bg.classList.remove("bg-down", "bg-up", "bg-left", "bg-right");
});

moveObject();

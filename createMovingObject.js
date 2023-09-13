export function createMovingObject ({ initialX, initialY, step, id }) {
  let positionX = initialX;
  let positionY = initialY;
  const objectStep = step;
  const object = document.getElementById(`object_${id}`);

  const moveObjectY = (isUp) => {
    positionY += isUp ? -objectStep : objectStep;
  };

  const moveObjectX = (isLeft) => {
    positionX += isLeft ? -objectStep : objectStep;
  };

  const moveObject = ({ isVertical, isUp, isHorizontal, isLeft }) => {
    if (isVertical) {
      moveObjectY(isUp);
    }
    if (isHorizontal) {
      moveObjectX(isLeft);
    }
    object.style.transform = `translate(${positionX}px, ${positionY}px)`;
  };

  return {
    moveObject
  };
}

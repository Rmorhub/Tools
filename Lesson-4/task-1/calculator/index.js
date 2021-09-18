// экспортируйте sum и mult как именной export

export const sum = (a, b) => {
  console.log('implementation for sum');
};

export const mult = (a, b) => {
  console.log('implementation for mult');
};

// экспортируйте calc как export по умолчанию

export default (expression) => {
  console.log('implementation for calc');
};
// export default calc;

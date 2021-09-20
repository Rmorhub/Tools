import printProfile from './renderProfile';

const userDate = {
  name: 'Tom',
  age: 17,
};

const profile = {
  ...userDate,
  company: 'Gromcode',
};

printProfile(profile);

const num = 17;

if (num === 18) {
  alert('Hi'); // eslint-disable-line no-alert
}

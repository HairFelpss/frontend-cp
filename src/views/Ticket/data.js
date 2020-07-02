
function getRandomInt(min, max) {
  min = Math.ceil(1000);
  max = Math.floor(2000);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default [
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'ekaterina.tankova@devias.io',
    status: 'close',
    createdAt: 1555016400000
  },
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'cao.yu@devias.io',
    status: 'pending',
    createdAt: 1555016400000
  },
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'alexa.richardson@devias.io',
    status: 'open',
    createdAt: 1555016400000
  },
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'anje.keizer@devias.io',
    status: 'open',
    createdAt: 1554930000000
  },
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'clarke.gillebert@devias.io',
    status: 'pending',
    createdAt: 1554757200000
  },
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'adam.denisov@devias.io',
    status: 'close',
    createdAt: 1554670800000
  },
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'ava.gregoraci@devias.io',
    status: 'close',
    createdAt: 1554325200000
  },
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'emilee.simchenko@devias.io',
    status: 'open',
    createdAt: 1523048400000
  },
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'kwak.seong.min@devias.io',
    status: 'close',
  },
  {
    id: getRandomInt(),
    subject: 'ipsum factum est ipsum factum est',
    email: 'merrile.burgett@devias.io',
    status: 'pending',
    createdAt: 1522702800000
  }
];

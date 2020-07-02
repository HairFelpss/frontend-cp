import uuid from 'uuid/v1';

function getRandomInt(min, max) {
  min = Math.ceil(1000);
  max = Math.floor(2000);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default [
  {
    ref: getRandomInt(),
    id: uuid(),
    subject:
      'O desgraça eu depositei 700 conto ontem ze vai tomar no cu so cade meu cash o inferno',
    category: 'Atraso',
    email: 'ekaterina.tankova@devias.io',
    status: 'close',
    createdAt: 1555016400000
  },
  {
    ref: getRandomInt(),
    id: uuid(),
    subject: 'ipsum factum est ipsum factum est',
    category: 'Atraso',
    email: 'cao.yu@devias.io',
    status: 'pending',
    createdAt: 1555016400000
  },
  {
    ref: getRandomInt(),
    id: uuid(),
    subject: 'ipsum factum est ipsum factum est',
    category: 'Atraso',
    email: 'alexa.richardson@devias.io',
    status: 'open',
    createdAt: 1555016400000
  },
  {
    ref: getRandomInt(),
    id: uuid(),
    subject: 'ipsum factum est ipsum factum est',
    category: 'Bug',
    email: 'anje.keizer@devias.io',
    status: 'open',
    createdAt: 1554930000000
  },
  {
    ref: getRandomInt(),
    id: uuid(),
    subject: 'ipsum factum est ipsum factum est',
    category: 'Atraso',
    email: 'clarke.gillebert@devias.io',
    status: 'pending',
    createdAt: 1554757200000
  },
  {
    ref: getRandomInt(),
    id: uuid(),
    subject: 'ipsum factum est ipsum factum est',
    category: 'Duvidas',
    email: 'adam.denisov@devias.io',
    status: 'close',
    createdAt: 1554670800000
  },
  {
    ref: getRandomInt(),
    id: uuid(),
    subject: 'ipsum factum est ipsum factum est',
    category: 'Duvidas',
    email: 'ava.gregoraci@devias.io',
    status: 'close',
    createdAt: 1554325200000
  },
  {
    ref: getRandomInt(),
    id: uuid(),
    subject: 'ipsum factum est ipsum factum est',
    category: 'Duvidas',
    email: 'emilee.simchenko@devias.io',
    status: 'open',
    createdAt: 1523048400000
  },
  {
    ref: getRandomInt(),
    id: uuid(),
    subject: 'ipsum factum est ipsum factum est',
    category: 'Duvidas',
    email: 'kwak.seong.min@devias.io',
    status: 'close'
  },
  {
    ref: getRandomInt(),
    id: uuid(),
    subject: 'ipsum factum est ipsum factum est',
    category: 'Duvidas',
    email: 'merrile.burgett@devias.io',
    status: 'pending',
    createdAt: 1522702800000
  }
];

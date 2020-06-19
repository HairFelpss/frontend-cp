import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: uuid(),
    name: 'Lendário',
    imageUrl: '/images/products/treasure_legendary.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Épico',
    imageUrl: '/images/products/treasure_epic.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Master',
    imageUrl: '/images/products/treasure_master.jpg',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Profissional',
    imageUrl: '/images/products/treasure_professional.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'Intermediário',
    imageUrl: '/images/products/treasure_intermediate.jpg',
    updatedAt: moment().subtract(9, 'hours')
  }
];

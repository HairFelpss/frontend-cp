import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    title: 'Lendário',
    description:
      'Para aqueles cuja fama se estende por todo o mundo, fazendo dele um Aventureiro Lendário.',
    imageUrl: '/images/products/treasure_legendary.png',
    totalDownloads: ' Itens Restantes',
    updatedAt: '27/03/2019'
  },
  {
    id: uuid(),
    title: 'Épico',
    description:
      'Adquirindo esse tesouro signifca que você fez seu nome no mundo e se tornou um aventureiro Épico.',
    imageUrl: '/images/products/treasure_epic.png',
    totalDownloads: ' Itens Restantes',
    createdAt: '31/03/2019'
  },
  {
    id: uuid(),
    title: 'Master',
    description:
      'Para quem dominou a arte de se aventurar sem problemas e fez sua própria fama  moedas amaveis asass',
    imageUrl: '/images/products/treasure_master.jpg',
    totalDownloads: ' Itens Restantes',
    createdAt: '03/04/2019'
  },
  {
    id: uuid(),
    title: 'Profissional',
    description:
      'Para você que é um Aventureiro Profissional e precisa de um impulso para a proxima missão.',
    imageUrl: '/images/products/treasure_professional.png',
    totalDownloads: ' Itens Restantes',
    createdAt: '04/04/2019'
  },
  {
    id: uuid(),
    title: 'Intermediário',
    description:
      'Para Aventureiros que querem começar a sua jornada com algumas coisas decentes.',
    imageUrl: '/images/products/treasure_intermediate.jpg',
    totalDownloads: ' Itens Restantes',
    createdAt: '04/04/2019'
  },
  {
    id: uuid(),
    title: 'Iniciante',
    description:
      'A maneira perfeita de começar sua aventura com algumas moedas para não passar tantas dificuldades.',
    imageUrl: '/images/products/treasure_begginer.png',
    totalDownloads: ' Itens Restantes',
    createdAt: '04/04/2019'
  }
];

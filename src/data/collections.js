export const collections = [
  {
    title: 'Victorys vintage jewelrys',
    image: '/categories/victory-vintage.png',
    text: 'Discover ornate vintage rings and earrings, rich colours and delicate details.',
  },
  {
    title: 'Marcasite Vintage Pendants',
    image: '/categories/pendants.png',
    text: 'Explore vintage pendants with intricate metalwork, colourful stones and distinctive motifs.',
  },
  {
    title: 'Precious & Semi-Precious Stones',
    image: '/categories/stones.png',
    text: 'Discover colour, character and natural beauty in every stone.',
  },
  {
    title: 'Gold Jewellery',
    image: '/categories/gold.png',
    text: 'Explore jewellery with the timeless warmth of gold.',
  },
  {
    title: 'Silver Jewellery',
    image: '/categories/silver.png',
    text: 'Find distinctive silver pieces full of detail and character.',
  },
  {
    title: 'Custom Jewellery',
    image: '/categories/custom.png',
    text: 'Talk to us about creating a piece that feels personal to you.',
  },
  {
    title: 'Jewellery Repairing',
    image: '/categories/repair.png',
    text: 'Visit us to discuss the care and repair of your treasured pieces.',
  },
  {
    title: 'Heritage Objects',
    image: '/categories/heritage.png',
    text: 'Discover carved keepsakes, decorative vessels and objects with a story.',
  },
];
export const braceletCategory = 'Marcasite Vintage Silver Bracelets';
export const necklaceCategory = 'Vintage Silver Necklaces';
export const silverPendantCategory = 'Vintage Silver Pendants';
export const silverSubcategories = [braceletCategory, necklaceCategory, silverPendantCategory];
export const categoryTabs = [
  'All Treasures',
  ...collections.map(({ title }) => title),
  ...silverSubcategories,
];
export function categoryFromSearch(search) {
  const params = new URLSearchParams(search);
  if (
    params.get('category') === 'Silver Jewellery' &&
    params.get('subcategory') === 'vintage-pendants'
  )
    return silverPendantCategory;
  if (
    params.get('category') === 'Silver Jewellery' &&
    params.get('subcategory') === 'vintage-necklaces'
  )
    return necklaceCategory;
  return params.get('category') === 'Silver Jewellery' &&
    params.get('subcategory') === 'marcasite-bracelets'
    ? braceletCategory
    : params.get('category');
}

export const silverBraceletCollection = {
  title: 'Marcasite Vintage Silver Bracelets',
  image: '/categories/marcasite-silver-bracelets.png',
  text: 'Discover delicate floral links, colourful stones and intricate vintage silver designs.',
  to: '/products?category=Silver%20Jewellery&subcategory=marcasite-bracelets',
};

export const silverNecklaceCollection = {
  title: necklaceCategory,
  image: '/categories/vintage-silver-necklaces.png',
  text: 'Discover sculptural pendants, intricate silver fringe and beautifully detailed vintage necklaces.',
  to: '/products?category=Silver%20Jewellery&subcategory=vintage-necklaces',
};

export const silverPendantCollection = {
  title: silverPendantCategory,
  image: '/categories/vintage-silver-pendants.png',
  text: 'Discover colourful stones, sculptural motifs and intricate vintage silver pendants.',
  to: '/products?category=Silver%20Jewellery&subcategory=vintage-pendants',
};

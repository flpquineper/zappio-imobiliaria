/** Mapa único das telas do painel, usado no menu e no painel inicial. */
export const ADMIN = {
  home: '/admin',
  help: '/admin/ajuda',
  account: '/admin/account',
  homePage: '/admin/globals/home-content',
  aboutPage: '/admin/globals/about-content',
  settings: '/admin/globals/settings',
  properties: '/admin/collections/properties',
  newProperty: '/admin/collections/properties/create',
  contacts: '/admin/collections/contact-messages',
  users: '/admin/collections/users',
  neighborhoods: '/admin/collections/neighborhoods',
  types: '/admin/collections/property-types',
  features: '/admin/collections/features',
  media: '/admin/collections/media',
} as const

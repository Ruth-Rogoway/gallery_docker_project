export interface Artwork {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  artType: 'oil' | 'acrylic' | 'watercolor' | 'pastel';
}

export const artTypes = [
  { value: 'oil', label: 'ציור שמן' },
  { value: 'acrylic', label: 'אקריליק' },
  { value: 'watercolor', label: 'צבעי מים' },
  { value: 'pastel', label: 'פסטל' },
] as const;

export const artworks: Artwork[] = [
  {
    id: '1',
    name: 'שקיעה על הים',
    price: 1200,
    description: 'ציור שמן מרהיב של שקיעה על חוף הים התיכון. צבעים חמים של כתום וזהב משתקפים על פני המים.',
    imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c036bc5c92?w=400&h=400&fit=crop',
    artType: 'oil',
  },
  {
    id: '2',
    name: 'פרחי אביב',
    price: 850,
    description: 'זר פרחים צבעוני בסגנון אימפרסיוניסטי. טכניקת אקריליק עם מריחות רחבות ודינמיות.',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
    artType: 'acrylic',
  },
  {
    id: '3',
    name: 'נוף הרים',
    price: 950,
    description: 'נוף הרים עדין בטכניקת צבעי מים. שקיפות הצבעים יוצרת תחושה אווררית ורגועה.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    artType: 'watercolor',
  },
  {
    id: '4',
    name: 'דיוקן חלומי',
    price: 1500,
    description: 'דיוקן רך בטכניקת פסטל. גווני עור עדינים ומבט עמוק יוצרים אווירה רגשית.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
    artType: 'pastel',
  },
  {
    id: '5',
    name: 'עיר עתיקה',
    price: 1100,
    description: 'נוף עירוני של סמטאות ירושלים. ציור שמן עם טקסטורות עשירות ואור חם.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=400&fit=crop',
    artType: 'oil',
  },
  {
    id: '6',
    name: 'גלים כחולים',
    price: 780,
    description: 'מופשט של גלי ים באקריליק. מריחות אנרגטיות בגווני כחול וטורקיז.',
    imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop',
    artType: 'acrylic',
  },
];

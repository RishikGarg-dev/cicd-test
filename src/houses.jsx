import p1i1 from "../src/assets/property1_image1.jpg";
import p1i2 from "../src/assets/property1_image2.jpg";
import p1i3 from "../src/assets/property1_image3.jpg";
import p1i4 from "../src/assets/property1_image4.jpg";
import p1i5 from "../src/assets/property1_image5.jpg";
import p1i6 from "../src/assets/property1_image6.jpg";
import p1i7 from "../src/assets/property1_image7.jpg";
import p1i8 from "../src/assets/property1_image8.jpg";
import p1i9 from "../src/assets/property1_image9.jpg";
import p1i10 from "../src/assets/property1_image10.png";

import p2i1 from "../src/assets/property2_image1.png";
import p2i2 from "../src/assets/property2_image2.png";
import p2i3 from "../src/assets/property2_image3.png";
import p2i4 from "../src/assets/property2_image4.png";
import p2i5 from "../src/assets/property2_image5.png";
import p2i6 from "../src/assets/property2_image6.png";
import p2i7 from "../src/assets/property2_image7.png";
import p2i8 from "../src/assets/property2_image8.png";
import p2i9 from "../src/assets/property2_image9.png";
import p2i10 from "../src/assets/property2_image10.png";

import p3i1 from "../src/assets/property3_image1.jpg";
import p3i2 from "../src/assets/property3_image2.jpg";
import p3i3 from "../src/assets/property3_image3.jpg";
import p3i4 from "../src/assets/property3_image4.jpg";
import p3i5 from "../src/assets/property3_image5.jpg";
import p3i6 from "../src/assets/property3_image6.jpg";
import p3i7 from "../src/assets/property3_image7.jpg";
import p3i8 from "../src/assets/property3_image8.png";
import p3i9 from "../src/assets/property3_image9.jpg";
import p3i10 from "../src/assets/property3_image10.jpg";

import p4i1 from "../src/assets/property4_image1.jpg";
import p4i2 from "../src/assets/property4_image2.jpg";
import p4i3 from "../src/assets/property4_image3.jpg";
import p4i4 from "../src/assets/property4_image4.jpg";
import p4i5 from "../src/assets/property4_image5.jpg";
import p4i6 from "../src/assets/property4_image6.jpg";
import p4i7 from "../src/assets/property4_image7.jpg";
import p4i8 from "../src/assets/property4_image8.jpg";
import p4i9 from "../src/assets/property4_image9.jpg";
import p4i10 from "../src/assets/property4_image10.jpg";

export const houses = [
  {
    id: 1,
    agentId: 1,
    title: 'shiftly 10th Floor',
    location: 'L.B Nagar ,Hyderabad ,500079',
    image: [
      'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756126939/img6_mi3dkk.jpg',
      p1i1,
      p1i2,
      p1i3,
      p1i4,
      p1i5,
      p1i6,
      p1i7,
      p1i8,
      p1i9,
      p1i10,
    ],
    description:`This well-maintained 2BHK apartment located at L.B Nagar ,Hyderabad ,500079. With a built-up area of 1600 Sq Ft, the home offers spacious 2 bedrooms, two modern bathrooms, 
                a semi-furnished modular kitchen, and a scenic road-facing balcony. Positioned on the 10th floor of a 5-storey building, the apartment receives ample natural light and ventilation throughout the day.
                The property is 5 years old and part of a secure, gated society that offers 24x7 security, lift access, power backup, and dedicated parking. It is ideal for small families or working professionals, offering 
                excellent connectivity to tech parks, hospitals, schools, and metro stations. With a monthly rent of ₹17,000 and a refundable deposit of ₹17,000, this home strikes the perfect balance between comfort, convenience, and affordability.`,
    beds: 3,
    size: '1600 Sq Ft',
    vehicles: '1 Reserved parking',
    type: 'Apartment',
    price: 17000,
    discount: 'null',
    deposit: '17000',
    bathrooms: 2,
    parking: 1,
    floor: '10th',
    furnishing: 'Semi-Furnished',
    propertyType: 'Apartment',
    lift: 'Available',
    security: '24/7 Security',
    powerBackup: 'Yes',
    propertyAge: 5,
    waterSupply: 'Borewell + Corporation',
    facing: 'East Facing',
    balcony: '2 (Road-facing)',
    nearbyLocation: 'HSR Layout, Bangalore',
    nearbyMetro: 'HSR Metro Station - 1.5 km',
    nearbyMall: 'Forum Mall - 3 km',
    mapImage: 'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756129875/map_zqyznb.png',
  },

  {
    id: 2,
    agentId: 4,
    title: 'karmanghat building',
    location: 'Karmanghat ,Hyderabad ,500059',
    image: [
      'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756127013/img2_aw7adw.jpg',
      p2i1,
      p2i2,
      p2i3,
      p2i4,
      p2i5,
      p2i6,
      p2i7,
      p2i8,
      p2i9,
      p2i10,
    ],
     description: `This well-maintained 3BHK apartment located Karmanghat,Hyderabad,500059. With a built-up area of 2050 Sq Ft, the home offers spacious 3 bedrooms, three modern bathrooms, 
                a un-furnished modular kitchen, and a scenic road-facing balcony. Positioned on the 4th floor of a 5-storey building, the apartment receives ample natural light and ventilation throughout the day.
                The property is 1 year old and part of a secure, gated society that offers 24x7 security, lift access, power backup, and dedicated parking. It is ideal for families or working professionals, offering 
                excellent connectivity to tech parks, hospitals, schools, and metro stations. With a monthly rent of ₹27,000 and a refundable deposit of ₹27,000, this home strikes the perfect balance between comfort, convenience, and affordability.`,
  beds: 3,
  size: '2050 Sq Ft',
  vehicles: '1 Reserved Parking',
  type: 'Apartment',
  price: 27000,
  discount: null,
  deposit: '27000',
  bathrooms: 2,
  parking: 1,
  floor: '4th',
  furnishing: 'Un-furnished',
  propertyType: 'Apartment',
  lift: 'Available',
  security: '24/7 Security',
  powerBackup: 'Yes',
  propertyAge: 1,
  waterSupply: 'Borewell + Corporation',
  facing: 'West Facing',
  balcony: '2 (Road-facing)',
  nearbyLocation: 'Karmanghat Bus Stop',
  nearbyMetro: 'L.B Nagar Metro Station - 1.5 km',
  nearbyMall: 'Colesium Mall - 1 km',
  mapImage: 'https://res.cloudinary.com/demo/image/upload/v1693849200/map_karmanghat.jpg' // Replace with actual map image URL
  },

  {
    id: 3,
    agentId: 3, 
    title: 'karmanghat house 10th Floor',
    location: 'Karmanghat ,Hyderabad ,500071',
    image: [
      'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756127133/img4_xrqqir.jpg',
      p4i1,
      p4i2,
      p4i3,
      p4i4,
      p4i5,
      p4i6,
      p4i7,
      p4i8,
      p4i9,
      p4i10,
    ],
     description: `This well-maintained 3BHK apartment located Karmanghat,Hyderabad,500071. With a built-up area of 1950 Sq Ft, the home offers spacious 3 bedrooms, two modern bathrooms, 
                a semi-furnished modular kitchen, and a scenic road-facing balcony. Positioned on the 10th floor of a 5-storey building, the apartment receives ample natural light and ventilation throughout the day.
                The property is 5 years old and part of a secure, gated society that offers 24x7 security, lift access, power backup, and dedicated parking. It is ideal for families or working professionals, offering 
                excellent connectivity to tech parks, hospitals, schools, and metro stations. With a monthly rent of ₹25,000 and a refundable deposit of ₹25,000, this home strikes the perfect balance between comfort, convenience, and affordability.`,
  beds: 3,
  size: '1950 Sq Ft',
  vehicles: '1 Reserved Parking',
  type: 'Apartment',
  price: 25000,
  discount: null,
  deposit: '25000',
  bathrooms: 2,
  parking: 1,
  floor: '10th',
  furnishing: 'Semi-Furnished',
  propertyType: 'Apartment',
  lift: 'Available',
  security: '24/7 Security',
  powerBackup: 'Yes',
  propertyAge: 5,
  waterSupply: 'Borewell + Corporation',
  facing: 'East Facing',
  balcony: '2 (Road-facing)',
  nearbyLocation: 'HSR Layout, Bangalore',
  nearbyMetro: 'HSR Metro Station - 1.5 km',
  nearbyMall: 'Forum Mall - 3 km',
  mapImage: 'https://res.cloudinary.com/demo/image/upload/v1693849200/map_karmanghat50071.jpg' // Replace with actual map image URL
  },

  {
    id: 4,
    agentId: 1,
    title: 'uppal house',
    location: 'Uppal ,Hyderabad ,500079',
    image: 'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756127204/img5_rcgpsf.jpg',
    description: `This well-maintained 2BHK apartment located at T.N.Reddy ,Hyderabad ,500079. With a built-up area of 1800 Sq Ft, the home offers spacious 2 bedrooms, two modern bathrooms, 
                a semi-furnished modular kitchen, and a scenic road-facing balcony. Positioned on the 2nd floor of a 5-storey building, the apartment receives ample natural light and ventilation throughout the day.
                The property is 5 years old and part of a secure, gated society that offers 24x7 security, lift access, power backup, and dedicated parking. It is ideal for small families or working professionals, offering 
                excellent connectivity to tech parks, hospitals, schools, and metro stations. With a monthly rent of ₹16,000 and a refundable deposit of ₹16,000, this home strikes the perfect balance between comfort, convenience, and affordability.`,
  beds: 3,
  size: '1800 Sq Ft',
  vehicles: '1 Reserved Parking',
  type: 'Apartment',
  price: 16000,
  discount: null,
  deposit: '16000',
  bathrooms: 2,
  parking: 1,
  floor: '10th',
  furnishing: 'Semi-Furnished',
  propertyType: 'Apartment',
  lift: 'Available',
  security: '24/7 Security',
  powerBackup: 'Yes',
  propertyAge: 5,
  waterSupply: 'Borewell + Corporation',
  facing: 'East Facing',
  balcony: '2 (Road-facing)',
  nearbyLocation: 'HSR Layout, Bangalore',
  nearbyMetro: 'HSR Metro Station - 1.5 km',
  nearbyMall: 'Forum Mall - 3 km',
  mapImage: 'https://res.cloudinary.com/demo/image/upload/v1693849200/map_uppal.jpg' // Replace with actual map image URL
  },

  {
    id: 5,
    agentId: 5,
    title: 'My Homes 2nd Floor',
    location: 'Hi-Tech City,Hyderabad ,500779',
    image: 'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756127204/img5_rcgpsf.jpg',
    description: `This well-maintained 2BHK apartment located 'Hi-Tech City,Hyderabad ,500779' With a built-up area of 1600 Sq Ft, 
                the home offers spacious 2 bedrooms, two modern bathrooms, a semi-furnished modular kitchen, and a scenic road-facing balcony. 
                  Positioned on the 2nd floor of a 5-storey building, the apartment receives ample natural light and ventilation throughout the day.
                  The property is 5 years old and part of a secure, gated society that offers 24x7 security, lift access, power backup, and dedicated parking. 
                  It is ideal for small families or working professionals, offering excellent connectivity to tech parks, hospitals, schools,
                  and metro stations. With a monthly rent of ₹60,000 and a refundable deposit of ₹1,50,000, this home strikes the perfect balance between 
                  comfort, convenience, and affordability.`,
    beds: 2,
    size: '1800 Sq Ft',
    vehicles: '2 2W+1 4W',
    type: 'Flat',
    price: 60000,
    discount: '15% OFF for 1st 3 months',
    deposit: '15000',
    bathrooms: 2,
    parking: 1,
    floor: '10th',
    furnishing: 'Semi-Furnished',
    propertyType: 'Apartment',
    lift: 'Available',
    security: '24/7 Security',
    powerBackup: 'Yes',
    propertyAge: 5,
    waterSupply: 'Borewell + Corporation',
    facing: 'East Facing',
    balcony: '2 (Road-facing)',
    nearbyLocation: 'HSR Layout, Bangalore',
    nearbyMetro: 'HSR Metro Station - 1.5 km',
    nearbyMall: 'Forum Mall - 3 km',
    mapImage: 'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756129875/map_zqyznb.png',
  },
  {
  id: 6,
  agentId: 5, 
  title: 'Premium Plug & Play Office Space in Madhapur',
  location: 'Madhapur, West Zone, Hyderabad',
  image: [
    'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756127135/img6_pqrstu.jpg',
    p6i1,
    p6i2,
    p6i3,
    p6i4,
  ],
  description: `This premium plug-and-play office space is available for rent in a prime, Vastu-compliant location in Madhapur, Hyderabad, conveniently adjoining a metro station. Spanning 2450 Sq. Ft. on the 5th floor, this west-facing office is ready to move in. The fully-furnished layout includes 40 workstations, 1 MD cabin, 2 manager cabins, 1 conference room, a reception area, and 2 washrooms. Key amenities include a central & split A/C system, 100% power backup, 24/7 water facility, high-speed elevators, and robust security with CCTV. The rental includes one dedicated car parking space. The monthly rent is ₹1,25,000 plus ₹16,500 for maintenance.`,
  workstations: 40,
  size: '2450 Sq. Ft.',
  vehicles: '1 Reserved Parking',
  type: 'Office Space',
  price: 125000,
  discount: null,
  deposit: 'Information not available',
  bathrooms: 2,
  parking: 1,
  floor: '5th',
  furnishing: 'Fully-Furnished',
  propertyType: 'Commercial',
  lift: 'Available',
  security: '24/7 Security & CCTV',
  powerBackup: 'Yes',
  propertyAge: null,
  waterSupply: '24/7 Facility',
  facing: 'West Facing',
  balcony: '1 (Individual)',
  nearbyLocation: 'Madhapur, Hyderabad',
  nearbyMetro: 'Adjoining Metro Station',
  nearbyMall: 'Information not available',
  mapImage: 'https://res.cloudinary.com/demo/image/upload/v1693849202/map_madhapur_hyderabad.jpg'
},
{
  id: 7,
  agentId: 6, 
  title: 'Fully-Furnished Plug & Play Office in Capital Park',
  location: 'Capital Park, Madhapur, West Zone, Hyderabad',
  image: [
    'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756127136/img7_uvwxyz.jpg',
    p7i1,
    p7i2,
    p7i3,
    p7i4,
    p7i5,
  ],
  description: `This premium 2490 Sq. Ft. fully-furnished office space is available for immediate lease in the prestigious Jain Sadguru Image Capital Park, an IT/SEZ in Madhapur. Located on the 2nd floor, this unit is perfectly suited for teams of around 40 people. The private space includes 1 MD cabin and 24 manager cabins. As part of a larger campus, tenants benefit from extensive shared facilities like an ultra-large cafeteria and a massive 812-seater conference room, significantly reducing overheads. The office comes equipped with AC, a wet pantry, and modern infrastructure. Commercial terms include a monthly rent of ₹2,50,000, a 6-month security deposit, and a 3-month lock-in period on an 11-month renewable lease.`,
  workstations: 40,
  size: '2490 Sq. Ft.',
  vehicles: 'Information not available',
  type: 'Office Space in IT/SEZ',
  price: 250000,
  discount: null,
  deposit: '1500000',
  bathrooms: 1,
  parking: null,
  floor: '2nd',
  furnishing: 'Fully-Furnished',
  propertyType: 'Commercial',
  lift: 'Available',
  security: '24/7 Security & CCTV',
  powerBackup: 'Yes',
  propertyAge: null,
  waterSupply: 'Available',
  facing: 'Garden View',
  balcony: '1 (Connected)',
  nearbyLocation: 'Madhapur, Hyderabad',
  nearbyMetro: 'Adjoining Metro Station',
  nearbyMall: 'Information not available',
  mapImage: 'https://res.cloudinary.com/demo/image/upload/v1693849203/map_capital_park_madhapur.jpg'
},
{
  id: 8,
  agentId: 7, 
  title: 'Commercial Building for Sale',
  location: 'Amberpet, Secunderabad, Hyderabad',
  image: [
    'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756127137/img8_ghijkl.jpg',
    p8i1,
    p8i2,
    p8i3,
  ],
  description: `Explore this expansive commercial building for sale, strategically located on the Amberpet Main Road near Circle No. 6. The property sits on a 452 sq yds land plot and features a substantial built-up area of 12,000 sq ft spread across four floors plus a cellar. Recently renovated and situated in a peaceful vicinity with wide road access, this building is an excellent investment opportunity near the city center and an adjoining metro station.`,
  beds: null,
  size: '12000 Sq. Ft. (Built-up) on 452 Sq. Yds. Plot',
  vehicles: 'Cellar Parking Available',
  type: 'Commercial Building',
  price: 105000000,
  discount: null,
  deposit: null,
  bathrooms: '1+',
  parking: 1,
  floor: '4 Floors + Cellar',
  furnishing: 'Unfurnished',
  propertyType: 'Commercial',
  lift: 'Information not available',
  security: 'Information not available',
  powerBackup: 'Yes',
  propertyAge: null,
  waterSupply: 'Available',
  facing: 'Information not available',
  balcony: 'Information not available',
  nearbyLocation: 'Amberpet, Secunderabad',
  nearbyMetro: 'Adjoining Metro Station',
  nearbyMall: 'Information not available',
  mapImage: 'https://res.cloudinary.com/demo/image/upload/v1693849204/map_amberpet_hyderabad.jpg'
},
{
  id: 9,
  agentId: 8, 
  title: 'Plot in Sai Annapurna County, Peddapur',
  location: 'Peddapur, Hyderabad',
  image: [
    'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756127138/img9_mnopqr.jpg',
    p9i1,
    p9i2,
  ],
  description: `This affordable 120-square-yard plot is located in the prime, gated society of Sai Annapurna County in Peddapur, near the city center. It offers the perfect opportunity to build your dream family home or make a sound long-term investment. The secure community enhances your lifestyle with a host of recreational amenities, including a swimming pool, badminton courts, and tennis courts. With 24x7 security and a well-maintained environment, this plot combines convenience, safety, and affordability.`,
  beds: null,
  size: '120 Sq. Yds.',
  vehicles: 'Space for Parking',
  type: 'Land',
  price: 1320000,
  discount: null,
  deposit: null,
  bathrooms: null,
  parking: null,
  floor: null,
  furnishing: null,
  propertyType: 'Land',
  lift: null,
  security: '24/7 Security & CCTV',
  powerBackup: 'Available in Community',
  propertyAge: null,
  waterSupply: 'Available in Community',
  facing: 'Information not available',
  balcony: null,
  nearbyLocation: 'Peddapur, Hyderabad',
  nearbyMetro: 'Information not available',
  nearbyMall: 'Information not available',
  mapImage: 'https://res.cloudinary.com/demo/image/upload/v1693849205/map_peddapur_hyderabad.jpg'
},
{
  id: 10,
  agentId: 10, 
  title: 'Fitted Office Space for Sale in SLN Terminus',
  location: 'SLN Terminus, Gachibowli, West Zone, Hyderabad',
  image: [
    'https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756127140/img11_uvwxyz.jpg',
    p11i1,
    p11i2,
    p11i3,
    p11i4,
  ],
  description: `This is an exceptional investment opportunity to own a 1,532 sq. ft. office space in the prestigious SLN Terminus, located in Hyderabad's dynamic commercial hub of Gachibowli. Priced at ₹2.76 Crore, this property promises a high rental yield. The semi-furnished, fitted space is situated on the 5th floor and features a bright, open work environment, a separate washroom, a dry pantry, and an individual balcony. The unit comes with dedicated parking in a well-constructed, secure commercial building, making it a perfect choice for businesses or investors.`,
  workstations: null,
  size: '1532 Sq. Ft.',
  vehicles: '1 Dedicated Parking',
  type: 'Office Space',
  price: 27600000,
  discount: null,
  deposit: null,
  bathrooms: 1,
  parking: 1,
  floor: '5th',
  furnishing: 'Semi-Furnished',
  propertyType: 'Commercial',
  lift: 'Available',
  security: 'Available',
  powerBackup: 'Yes',
  propertyAge: null,
  waterSupply: 'Available',
  facing: 'Road View',
  balcony: '1 (Individual)',
  nearbyLocation: 'Gachibowli, Hyderabad',
  nearbyMetro: 'Adjoining Metro Station',
  nearbyMall: 'Information not available',
  mapImage: 'https://res.cloudinary.com/demo/image/upload/v1693849207/map_gachibowli_hyderabad.jpg'
},

];

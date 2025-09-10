import { houses } from './houses';

export const agentsData = [
  {
    id: 1,
    name: "Uday",
    city: "Hyderabad",
    rating: 5,
    reviewsCount: 95,
    experience: 3,
    languages: ["Telugu", "Hindi"],
    specialties: ["Luxury Rentals", "Budget-Friendly Options", "Family Rentals"],
    about: `Uday is a young, dynamic agent known for quickly finding properties that match his clients’ exact needs. With multilingual skills, he caters to a wide range of clients in Hyderabad.
    With over a decade in the real estate industry, I specialize in matching clients with their dream homes, investment properties, and commercial spaces. 
    I believe in building relationships based on trust, transparency, and results. 
    Having closed deals in multiple cities, I bring a deep understanding of market trends and pricing strategies.Clients appreciate my punctuality, attention to detail, and hands-on support throughout the process. 
    Outside of work, I enjoy exploring new neighborhoods and studying architectural designs.`,
    phone: "+91 9154227154",
    email: "uday@swiftly.com",
    image: "/images/agent.jpg",
    activeProperties: houses.filter(h => h.agentId === 1),
    reviews: [
      { name: "Aarav", date: "Aug 05, 2025", rating: 5, comment: "Uday was very responsive and showed me multiple options in my budget." },
      { name: "Sneha", date: "Aug 08, 2025", rating: 5, comment: "Found my dream apartment in just 2 days thanks to Uday’s efforts!" },
      { name: "Rajesh", date: "Aug 10, 2025", rating: 4, comment: "Good service, but a few listings were above my budget." },
      { name: "Megha", date: "Aug 12, 2025", rating: 5, comment: "Super professional, made the process easy and transparent." }
    ]
  },
  {
    id: 2,
    name: "Shiva",
    city: "Chennai",
    rating: 5,
    reviewsCount: 88,
    experience: 8,
    languages: ["English", "Hindi"],
    specialties: ["Luxury Rentals", "Budget-Friendly Options", "Seaside Homes"],
    about: `Shiva has deep knowledge of Chennai’s prime neighborhoods and is an expert in coastal and luxury rentals.`,
    phone: "+91 9154227154",
    email: "shiva@swiftly.com",
    image: "/images/agent.jpg",
    activeProperties: houses.filter(h => h.agentId === 2),
    reviews: [
      { name: "Karthik", date: "July 20, 2025", rating: 5, comment: "Shiva made the whole rental process smooth and stress-free." },
      { name: "Meera", date: "Aug 02, 2025", rating: 5, comment: "Highly recommend Shiva for his professionalism and local expertise." },
      { name: "Anil", date: "Aug 06, 2025", rating: 4, comment: "Great options, but some were far from my preferred area." },
      { name: "Pavithra", date: "Aug 09, 2025", rating: 5, comment: "Found my perfect beachfront apartment thanks to Shiva." }
    ]
  },
  {
    id: 3,
    name: "Manoj",
    city: "Bangalore",
    rating: 4,
    reviewsCount: 70,
    experience: 8,
    languages: ["English", "Hindi"],
    specialties: ["IT Sector Rentals", "Startup Housing", "Family Apartments"],
    about: `Manoj specializes in matching IT professionals with homes near tech hubs in Bangalore.`,
    phone: "+91 9154227154",
    email: "manoj@swiftly.com",
    image: "/images/agent.jpg",
    activeProperties: houses.filter(h => h.agentId === 3),
    reviews: [
      { name: "Vikram", date: "July 15, 2025", rating: 4, comment: "Good experience overall, though the process took a little time." },
      { name: "Anita", date: "Aug 04, 2025", rating: 5, comment: "Manoj found me a great apartment right next to my office." },
      { name: "Pradeep", date: "Aug 07, 2025", rating: 4, comment: "Well-connected in the industry, got me quick approvals." },
      { name: "Leela", date: "Aug 11, 2025", rating: 5, comment: "Super friendly and professional throughout." }
    ]
  },
  {
    id: 4,
    name: "Priya",
    city: "Mumbai",
    rating: 5,
    reviewsCount: 110,
    experience: 10,
    languages: ["English", "Hindi", "Marathi"],
    specialties: ["Luxury Apartments", "Corporate Housing", "Sea View Homes"],
    about: `Priya has over a decade of experience in Mumbai’s real estate scene, known for securing premium homes for corporate clients.`,
    phone: "+91 9154227154",
    email: "priya@swiftly.com",
    image: "/images/agent.jpg",
    activeProperties: houses.filter(h => h.agentId === 4),
    reviews: [
      { name: "Rohit", date: "July 22, 2025", rating: 5, comment: "Priya got me a sea-view apartment in record time!" },
      { name: "Neha", date: "Aug 03, 2025", rating: 5, comment: "Professional and extremely knowledgeable about Mumbai neighborhoods." },
      { name: "Siddharth", date: "Aug 07, 2025", rating: 4, comment: "Great service, but some listings were slightly overpriced." },
      { name: "Tanya", date: "Aug 12, 2025", rating: 5, comment: "Highly recommend Priya for corporate relocations." }
    ]
  },
  {
    id: 5,
    name: "Rahul",
    city: "Delhi",
    rating: 4,
    reviewsCount: 80,
    experience: 6,
    languages: ["English", "Hindi", "Punjabi"],
    specialties: ["Budget Rentals", "Commercial Properties", "New Developments"],
    about: `Rahul is known for helping clients find both budget-friendly rentals and prime commercial spaces in Delhi.`,
    phone: "+91 9154227154",
    email: "rahul@swiftly.com",
    image: "/images/agent.jpg",
    activeProperties: houses.filter(h => h.agentId === 5),
    reviews: [
      { name: "Varun", date: "July 18, 2025", rating: 4, comment: "Rahul was patient and showed me multiple budget options." },
      { name: "Pooja", date: "Aug 01, 2025", rating: 5, comment: "Found a great apartment within my budget in Green Park." },
      { name: "Ashok", date: "Aug 06, 2025", rating: 4, comment: "Helped me secure an office space quickly." },
      { name: "Ritika", date: "Aug 11, 2025", rating: 5, comment: "Rahul knows the Delhi market very well and is reliable." }
    ]
  },
  {
    id: 6,
    name: "Ananya",
    city: "Pune",
    rating: 5,
    reviewsCount: 65,
    experience: 5,
    languages: ["English", "Hindi", "Marathi"],
    specialties: ["Student Housing", "Budget Apartments", "Tech Hub Rentals"],
    about: `Ananya is the go-to agent for students and young professionals looking for affordable, well-located rentals in Pune.`,
    phone: "+91 9154227154",
    email: "ananya@swiftly.com",
    image: "/images/agent.jpg",
    activeProperties: houses.filter(h => h.agentId === 6),
    reviews: [
      { name: "Sagar", date: "July 14, 2025", rating: 5, comment: "Ananya found me a flat close to my college in just 2 days." },
      { name: "Isha", date: "Aug 02, 2025", rating: 5, comment: "Friendly and always available to answer questions." },
      { name: "Mayur", date: "Aug 08, 2025", rating: 4, comment: "Great service, though some listings needed better photos." },
      { name: "Rashmi", date: "Aug 11, 2025", rating: 5, comment: "Best agent I’ve worked with in Pune!" }
    ]
  }
];
/**
 * VT CHEFS — OFFICIAL PURE VEGETARIAN MENU DATA
 * Source of truth: VT Chefs Menu PDF
 * 
 * STRICT RULES:
 * - 100% Pure Vegetarian
 * - Zero meat, poultry, seafood, egg, or animal derivatives
 * - No invented prices (all items display "Price on request")
 */

export const CUISINES = [
  {
    id: "mexican",
    name: "Mexican",
    subtitle: "Fiesta de Sabores",
    description: "Vibrant Mexican street dishes and comforting classics with fresh avocado, fire-roasted salsas, and golden melted cheese.",
    image: "/images/cuisines/mexican.jpg",
    tags: ["Tacos & Nachos", "Fresh Salsas", "Cheesy Delicacies"]
  },
  {
    id: "italian",
    name: "Italian",
    subtitle: "Artisanal Tradition",
    description: "Handcrafted vegetarian pastas, slow-cooked risotto with wild forest mushrooms, and woodfired thin-crust pizzas.",
    image: "/images/cuisines/italian.jpg",
    tags: ["Handmade Pastas", "Wild Truffle", "Woodfired Crusts"]
  },
  {
    id: "chinese",
    name: "Chinese",
    subtitle: "Wok & Steam Mastery",
    description: "Crisp golden spring rolls, wok-tossed thread paneer, fragrant fried rice, and savory vegetable dumplings.",
    image: "/images/cuisines/chinese.jpg",
    tags: ["Crispy Starters", "Thread Paneer", "Wok Tossed"]
  },
  {
    id: "gujarati",
    name: "Gujarati",
    subtitle: "Heritage & Farsan",
    description: "Iconic steamed farsan including nylon khaman, emerald green dhokla, golden jalebi fafda, and spiced savory snacks.",
    image: "/images/cuisines/gujarati.jpg",
    tags: ["Spongy Khaman", "Fafda Jalebi", "Crispy Farsan"]
  },
  {
    id: "gujarati-rasoi",
    name: "Gujarati Rasoi",
    subtitle: "Royal Home Kitchen",
    description: "Time-honoured heritage delicacies: gatta sabji, peru sabji (guava curry), fada khichdi, and sweet rabdi malpua.",
    image: "/images/cuisines/gujarati-rasoi.jpg",
    tags: ["Heritage Thali", "Peru Sabji", "Rabdi Malpua"]
  },
  {
    id: "rajasthani-rasoi",
    name: "Rajasthani Rasoi",
    subtitle: "Royal Marwar Feasts",
    description: "Regal desert cuisine featuring pure desi ghee Dal Baati Churma, authentic Ker Sangri, and crispy spiced bhindi.",
    image: "/images/cuisines/rajasthani-rasoi.jpg",
    tags: ["Dal Baati Churma", "Ker Sangri", "Jodhpuri Vada"]
  },
  {
    id: "punjabi-rasoi",
    name: "Punjabi Rasoi",
    subtitle: "Heart of Punjab",
    description: "Rich, slow-simmered gravies, melt-in-mouth malai kofta, paneer makhani, and velvety dal makhani with fresh cream.",
    image: "/images/cuisines/punjabi-rasoi.jpg",
    tags: ["Dal Makhani", "Paneer Makhani", "Malai Kofta"]
  }
];

export const DISHES = [
  // ================= MEXICAN =================
  {
    id: "mex-nachos",
    cuisineId: "mexican",
    name: "Nachos",
    category: "starters",
    diet: ["veg"],
    description: "Crispy stone-ground corn tortilla chips seasoned with Mexican sea salt and herbs, ready for gourmet dips.",
    priceInfo: "Price on request",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDX-wTILo6DankUD0JvfWhcHHW7hS44SAjwL-kA0P9h9xBAuRpGdDtXZOiL6D7NUv-091Chg01jvjhp9QQ8rbkoOGWtkA2FH0UvvnGyWuPJRGprP_HW3N0iHGyrT97Y65E-UfXIjbTfUMPn_YdUYSNvQCxB8g8cR9hlxf7HIddJsob_V3MDNofUbtRvmMx3Ah7DpgdWjKEAxBsbczHFJ_m9Rw0Gr41Fdsl5FIQHfBmoTCv-1scQLtYo"
  },
  {
    id: "mex-cheese-sauce",
    cuisineId: "mexican",
    name: "Cheese Sauce",
    category: "starters",
    diet: ["veg"],
    description: "Velvety warm melted cheddar and Monterey Jack cheese sauce with subtle jalapeño warmth.",
    priceInfo: "Price on request",
    image: "/images/cuisines/mexican.jpg"
  },
  {
    id: "mex-salsa-sauce",
    cuisineId: "mexican",
    name: "Salsa Sauce",
    category: "starters",
    diet: ["veg", "vegan", "jain"],
    description: "Fire-roasted Roma tomatoes, serrano chilies, fresh lime juice, and chopped cilantro.",
    priceInfo: "Price on request",
    image: "/images/cuisines/mexican.jpg"
  },
  {
    id: "mex-tacos",
    cuisineId: "mexican",
    name: "Tacos",
    category: "main",
    diet: ["veg"],
    description: "Artisanal corn tortillas loaded with sautéed fajita bell peppers, spiced black beans, cotija cheese, and lime crema.",
    priceInfo: "Price on request",
    image: "/images/cuisines/mexican.jpg"
  },
  {
    id: "mex-rice",
    cuisineId: "mexican",
    name: "Mexican Rice",
    category: "main",
    diet: ["veg", "vegan"],
    description: "Long-grain rice simmered slowly in rich tomato broth with sweet corn, peas, and cumin.",
    priceInfo: "Price on request",
    image: "/images/cuisines/mexican.jpg"
  },
  {
    id: "mex-lachhi-lada",
    cuisineId: "mexican",
    name: "Lachhi Lada",
    category: "snacks",
    diet: ["veg"],
    description: "Crispy golden layered corn delicacy seasoned with Mexican spices and herbs.",
    priceInfo: "Price on request",
    image: "/images/cuisines/mexican.jpg"
  },
  {
    id: "mex-soup",
    cuisineId: "mexican",
    name: "Mexican Soup",
    category: "starters",
    diet: ["veg", "vegan"],
    description: "Smoky chipotle tomato broth with fire-roasted corn kernels, black beans, and crispy tortilla strips.",
    priceInfo: "Price on request",
    image: "/images/cuisines/mexican.jpg"
  },
  {
    id: "mex-cheese-corn-balls",
    cuisineId: "mexican",
    name: "Cheese Corn Balls",
    category: "starters",
    diet: ["veg"],
    description: "Golden crispy crumbed spheres filled with molten mozzarella, sweet corn, and mild herbs.",
    priceInfo: "Price on request",
    image: "/images/cuisines/mexican.jpg"
  },

  // ================= ITALIAN =================
  {
    id: "ita-pasta",
    cuisineId: "italian",
    name: "Pasta",
    category: "main",
    diet: ["veg"],
    description: "Handcrafted pasta tossed in your choice of rich San Marzano marinara or creamy garlic emulsion.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-pizza",
    cuisineId: "italian",
    name: "Pizza",
    category: "main",
    diet: ["veg"],
    description: "Woodfired sourdough pizza topped with crushed Italian plum tomatoes, fresh mozzarella, and sweet basil leaves.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-falafel",
    cuisineId: "italian",
    name: "Falafel",
    category: "starters",
    diet: ["veg", "vegan"],
    description: "Crispy golden chickpea herb fritters spiced with coriander and cumin, served with house tahini.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-burger",
    cuisineId: "italian",
    name: "Burger",
    category: "main",
    diet: ["veg"],
    description: "Artisanal brioche burger with crisp garden vegetable patty, melted provolone cheese, and garlic herb spread.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-cheese-paneer-roll",
    cuisineId: "italian",
    name: "Cheese Paneer Roll",
    category: "snacks",
    diet: ["veg"],
    description: "Flaky baked Italian pastry roll filled with marinated paneer, shredded mozzarella, and Italian herbs.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-corn-soup",
    cuisineId: "italian",
    name: "Corn Soup",
    category: "starters",
    diet: ["veg", "jain"],
    description: "Velvety sweet corn velouté finished with cracked black pepper and extra virgin olive oil.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-pink-pasta",
    cuisineId: "italian",
    name: "Pink Pasta",
    category: "main",
    diet: ["veg"],
    description: "Penne tossed in a delicate blend of cream and sun-ripened tomato pomodoro with parmesan cheese.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-basil-pasta",
    cuisineId: "italian",
    name: "Basil Pasta",
    category: "main",
    diet: ["veg"],
    description: "Al dente pasta swirled with fragrant Ligurian sweet basil pesto, pine nuts, and aged pecorino.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-dry-pasta",
    cuisineId: "italian",
    name: "Dry Pasta",
    category: "main",
    diet: ["veg", "vegan"],
    description: "Spaghetti Aglio e Olio sautéed with golden slivered garlic, red chili flakes, parsley, and Tuscan olive oil.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-veg-baked",
    cuisineId: "italian",
    name: "Vegetable Baked Dish",
    category: "main",
    diet: ["veg"],
    description: "Tender zucchini, bell peppers, and baby corn layered with silky béchamel and baked to a golden crust.",
    priceInfo: "Price on request",
    image: "/images/cuisines/italian.jpg"
  },
  {
    id: "ita-risotto",
    cuisineId: "italian",
    name: "Truffle Mushroom Risotto",
    category: "main",
    diet: ["veg"],
    description: "Carnaroli rice slow-cooked with wild forest mushrooms, Parmigiano-Reggiano, and black truffle oil.",
    priceInfo: "Price on request",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXCudK7XEU-pCrgRhm0FtaJLmUpNjvgHJmIjsFpiTQxiGYH06PqGFK6tKBa_cWwxIyKvs-2ladYh1jo0aHiP5eZ2_6bRr1Huu5WEWBRMT-lWjUf-_RiyPxna14aZxS8h6LwSP8GrXhUjYN8y0lbpSIPog4mUFhm5iSrDU3FmykE5y51sOCIwJro5hAE040vSFsm-WcLwtCjcBgMG3g8q9QAaN4bNpb5XYhmKSOM_IiFoLID9DlMBdh"
  },

  // ================= CHINESE =================
  {
    id: "chi-spring-rolls",
    cuisineId: "chinese",
    name: "Spring Rolls",
    category: "starters",
    diet: ["veg", "vegan"],
    description: "Golden crispy handmade wrappers stuffed with shredded cabbage, carrots, bell peppers, and glass noodles.",
    priceInfo: "Price on request",
    image: "/images/cuisines/chinese.jpg"
  },
  {
    id: "chi-patti-samosa",
    cuisineId: "chinese",
    name: "Chinese Patti Samosa",
    category: "snacks",
    diet: ["veg", "vegan"],
    description: "Delicate paper-thin samosa crust packed with stir-fried spiced noodles, scallions, and soy seasonings.",
    priceInfo: "Price on request",
    image: "/images/cuisines/chinese.jpg"
  },
  {
    id: "chi-thread-paneer",
    cuisineId: "chinese",
    name: "Thread Paneer",
    category: "starters",
    diet: ["veg"],
    description: "Marinated cottage cheese fingers wrapped in fine crispy vermicelli threads, fried until exquisitely crunchy.",
    priceInfo: "Price on request",
    image: "/images/cuisines/chinese.jpg"
  },
  {
    id: "chi-chopsuey",
    cuisineId: "chinese",
    name: "American Chopsuey",
    category: "main",
    diet: ["veg", "vegan"],
    description: "Crunchy fried noodles smothered in a sweet, tangy, and mildly spiced shredded vegetable sauce.",
    priceInfo: "Price on request",
    image: "/images/cuisines/chinese.jpg"
  },
  {
    id: "chi-fried-rice",
    cuisineId: "chinese",
    name: "Chinese Fried Rice",
    category: "main",
    diet: ["veg", "vegan"],
    description: "Fragrant wok-tossed long-grain rice with finely diced scallions, baby carrots, French beans, and dark soy.",
    priceInfo: "Price on request",
    image: "/images/cuisines/chinese.jpg"
  },
  {
    id: "chi-manchurian",
    cuisineId: "chinese",
    name: "Manchurian",
    category: "main",
    diet: ["veg", "vegan"],
    description: "Savory minced vegetable dumplings simmered in a glossy ginger, garlic, green chili, and soy reduction.",
    priceInfo: "Price on request",
    image: "/images/cuisines/chinese.jpg"
  },
  {
    id: "chi-baby-corn",
    cuisineId: "chinese",
    name: "Crispy Chili Baby Corn",
    category: "starters",
    diet: ["veg", "vegan"],
    description: "Golden battered baby corn tossed with scallions, garlic, soy sauce, and crushed dried red chilies.",
    priceInfo: "Price on request",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvzEAL0h4sB7egmr4_Hwjl_4n9_DL8bnxJmbsYLblgPIipHjIeMF6If5FRGO6dBpkZs-saYSzL3yNmQYoMZS-sUDBa7YwqPVBK4mZDIumLT-RZeuC93cVwyPOSCCH0gdSz8auF7AJ1uuVJONnOhxx1mJ2QI_CQyCVaqWTUJyWCyTZtKOEPI2AvR73SKOGbSyWoJglXs6lrzHQDru-1sqU5s8CQNSvkRsNAyTyeNckXbEsI9WR4kWKW"
  },

  // ================= GUJARATI =================
  {
    id: "guj-jalebi",
    cuisineId: "gujarati",
    name: "Jalebi",
    category: "desserts",
    diet: ["veg", "jain"],
    description: "Crispy fermented batter swirls fried to golden perfection and drenched in aromatic saffron and cardamom syrup.",
    priceInfo: "Price on request",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJjOp0u-Mrq0AmKgTQnqSm-smOKBNYc5GVtSO1_59CzzdT_2KNxe6ggGRHVnBsd6qTwF5EGLW9SSmUc30ISkgf1iVRRYfiNzGzeUL3jWdshfuorneDjhguaIFJHFQ1ObBUMiuhpBCDD4964J891eftzEIGvM5YYx9wQpij7SVVurnTxv19HbDUVHPXsf238gkIZJfREEV-fmvSxT4uJDpBQeSh6GcZr9GfFlqHsOoGt3GydrKvVsaP"
  },
  {
    id: "guj-fafda",
    cuisineId: "gujarati",
    name: "Fafda",
    category: "snacks",
    diet: ["veg", "jain"],
    description: "Crisp, savory gram flour strips spiced with ajwain and black pepper, served with tangy papaya sambharo.",
    priceInfo: "Price on request",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5NV86INU2Sh_xjNuycoq6ab_r4m91Gjpe_pJK3c0-K1GG205GG3SWsgXZUc-PpB0bMmSLJv-nWLGHijcKJ4X8bfSrDXksLB-_DyNZEJ1M0WYBW0cmFZYZeWywH2jnbzKDlV328FcRxlxktQYaH_jkv0k2rcV8jyf2mF5iitIbQWbO_zCniDTscx186NuTYJ6HiQMsP1PVbmQwsYWs-dH8HqmeJ8fnbx6mUtVve4X5DX-TqD5RRDpZ"
  },
  {
    id: "guj-green-dhokla",
    cuisineId: "gujarati",
    name: "Green Dhokla",
    category: "starters",
    diet: ["veg", "jain"],
    description: "Flavorful steamed savory cakes infused with fresh coriander, mint, and green chilies, tempered with mustard.",
    priceInfo: "Price on request",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-a0nV5jCSrSDyy8zhW-aoPOVSoFAkgvN04CrKjdi2DFk6F8IR5zMaYakGZpVtP84mlwAIUkHirMKus22M-ibDCNp_o2qizVmqjZ0V-MpjSdjWusxQ_Du8W0I27Kfk7hC9ksGHO693hmH9uuL4su1fD2kiRCdosS1lT4xYK-3dAKYJT8mVV4ptJDc0_PiuK5FyREuY8dP5m41ulwqe1prEr2velb2l6eww-6_0VDPtR1rQCGk9cQus"
  },
  {
    id: "guj-american-khaman",
    cuisineId: "gujarati",
    name: "American Khaman",
    category: "starters",
    diet: ["veg", "jain"],
    description: "Spongy, sweet-savory khaman infused with sweet corn and gentle aromatic tempering.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-nylon-khaman",
    cuisineId: "gujarati",
    name: "Nylon Khaman",
    category: "starters",
    diet: ["veg", "jain"],
    description: "Soft, spongy, melt-in-the-mouth gram flour steamed cakes drenched in sweet and tangy lemon syrup.",
    priceInfo: "Price on request",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnTTX06cN9XcUWv9Q1l3-nP2XAVfIqgDG_bU02HENNNdb9na7Gu7oBFSufkO_vYqWWVbSDr2eYEpVAKlXxAR7UNn6RjMGW-yChCrRbHe92CaTNMlTx5tF3DOlMtiNKrxKqMoGaha9a-3u-pP2t88V_ukwoOLYVXtQjrFV9SmsbAXneJYNF7xzLNjmqM2hyaLEJl5ncQ3AH7toBr-AKm-Gx7EdulbV_RKk2da3j03n-bCDBC_x2RchP"
  },
  {
    id: "guj-veg-dhokla",
    cuisineId: "gujarati",
    name: "Vegetable Dhokla",
    category: "starters",
    diet: ["veg"],
    description: "Fermented rice and lentil steamed savory cake packed with shredded carrots, peas, and mustard tempering.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-handvo",
    cuisineId: "gujarati",
    name: "Handvo",
    category: "main",
    diet: ["veg"],
    description: "Savory baked lentil and rice cake packed with bottle gourd, spices, and a crunchy sesame seed crust.",
    priceInfo: "Price on request",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4iWofDl0K7wJzoqQmG8qC07lTjq-V5oUQg7xQB1zp5TeaxoxPOqyVYT8Zv3UEiytVATK0tk8lYIHQIlSp6vPtxp5c0Syt6iDp0A3p5m6Zj7K-xjR3lIguffPa_SgX4WGbnEMeZlv-FsmgPw_Q9y9fdgi7q5itlW6pe1emsmGnR2BvRXIgfmXdUpIRKhQ6eTK64A9FbZ4sWG1VXU3WAj2I7CYDtZeX2ziT8plzjFZKtVIui6dt-sYZ"
  },
  {
    id: "guj-kela-vada",
    cuisineId: "gujarati",
    name: "Kela Vada",
    category: "snacks",
    diet: ["veg", "jain"],
    description: "Spiced raw banana dumplings flavored with ginger, green chilies, and fresh coriander, fried golden.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-batata-vada",
    cuisineId: "gujarati",
    name: "Batata Vada",
    category: "snacks",
    diet: ["veg"],
    description: "Mashed spiced potatoes coated in chickpea flour batter and fried until crisp, served with chutneys.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-patties",
    cuisineId: "gujarati",
    name: "Patties",
    category: "snacks",
    diet: ["veg"],
    description: "Traditional farali potato patties with sweet and spicy coconut and dry fruit filling.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-sandwich-patties",
    cuisineId: "gujarati",
    name: "Sandwich Patties",
    category: "snacks",
    diet: ["veg"],
    description: "Crispy layered potato patties stuffed with spiced cottage cheese and toasted.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-mini-idli",
    cuisineId: "gujarati",
    name: "Mini Idli",
    category: "starters",
    diet: ["veg", "vegan", "jain"],
    description: "Steamed button rice cakes tempered with mustard seeds, curry leaves, and podi spices.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-medu-vada",
    cuisineId: "gujarati",
    name: "Medu Vada",
    category: "starters",
    diet: ["veg", "vegan"],
    description: "Crisp golden donut-shaped lentil fritters with a fluffy interior, served with coconut chutney.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-rasam-vada",
    cuisineId: "gujarati",
    name: "Rasam Vada",
    category: "starters",
    diet: ["veg", "vegan"],
    description: "Crisp medu vadas immersed in a piping hot, tangy tomato-tamarind pepper broth.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-dal-vada",
    cuisineId: "gujarati",
    name: "Dal Vada",
    category: "snacks",
    diet: ["veg", "vegan"],
    description: "Crisp, crunchy split moong dal fritters spiked with crushed peppercorns and green chilies.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-corn-bhajiya",
    cuisineId: "gujarati",
    name: "Corn Bhajiya",
    category: "snacks",
    diet: ["veg", "jain"],
    description: "Juicy sweet corn kernels folded into spiced gram flour batter and fried to golden puffs.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-chinese-bhajiya",
    cuisineId: "gujarati",
    name: "Chinese Bhajiya",
    category: "snacks",
    diet: ["veg", "vegan"],
    description: "Crunchy shredded cabbage and vegetable fritters tossed in Indo-Chinese herbs and spices.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-can-roll",
    cuisineId: "gujarati",
    name: "Can Roll",
    category: "starters",
    diet: ["veg"],
    description: "Cylindrical golden fried pastry rolls stuffed with spiced potato and sweetcorn mash.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-corn-patties",
    cuisineId: "gujarati",
    name: "Corn Patties",
    category: "snacks",
    diet: ["veg"],
    description: "Sweet corn and potato cutlets with ginger, green chili, and lemon seasoning.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-canned-patties",
    cuisineId: "gujarati",
    name: "Canned Patties",
    category: "snacks",
    diet: ["veg"],
    description: "Artisanal sealed stuffed flaky patties, fried to a crisp golden brown.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-panda-gobi",
    cuisineId: "gujarati",
    name: "Panda Gobi",
    category: "starters",
    diet: ["veg"],
    description: "Crispy cauliflower florets coated in sweet, sour, and spicy Gujarati street seasoning.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-chana-dal-samosa",
    cuisineId: "gujarati",
    name: "Chana Dal Samosa",
    category: "snacks",
    diet: ["veg", "jain"],
    description: "Mini crisp patti samosas filled with spicy, savory tempered split Bengal gram dal.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-dabeli",
    cuisineId: "gujarati",
    name: "Dabeli",
    category: "snacks",
    diet: ["veg"],
    description: "Toasted pav buns filled with sweet-tangy spiced potato masala, sev, roasted peanuts, and pomegranate.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-paneer-pakoda",
    cuisineId: "gujarati",
    name: "Paneer Pakoda",
    category: "starters",
    diet: ["veg"],
    description: "Soft fresh paneer sandwiches layered with mint chutney, dipped in spiced batter, and fried golden.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-monaco-basket",
    cuisineId: "gujarati",
    name: "Monaco Biscuit Basket",
    category: "snacks",
    diet: ["veg"],
    description: "Salty Monaco crackers topped with spiced potato chaat, sweet date chutney, and crisp nylon sev.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-saag-basket",
    cuisineId: "gujarati",
    name: "Saag Basket",
    category: "snacks",
    diet: ["veg"],
    description: "Crispy mini edible pastry baskets filled with spiced spinach, cottage cheese, and sweet yogurt drizzle.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-paneer-capsicum-sandwich",
    cuisineId: "gujarati",
    name: "Paneer Capsicum Onion Sandwich",
    category: "snacks",
    diet: ["veg"],
    description: "Toasted sandwich with spiced paneer slices, crunchy bell peppers, and melted cheese.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-toast-sandwich",
    cuisineId: "gujarati",
    name: "Toast Sandwich",
    category: "snacks",
    diet: ["veg"],
    description: "Classic street-style toasted sandwich filled with spiced boiled potatoes, cucumbers, tomatoes, and mint chutney.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-cheese-corn-sandwich",
    cuisineId: "gujarati",
    name: "Cheese Corn Capsicum Sandwich",
    category: "snacks",
    diet: ["veg"],
    description: "Golden grilled sandwich brimming with sweet corn, bell peppers, and gooey mozzarella cheese.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-simple-sandwich",
    cuisineId: "gujarati",
    name: "Simple Sandwich",
    category: "snacks",
    diet: ["veg"],
    description: "Delicate tea sandwich with butter, mint chutney, cucumber slices, and chat masala.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },
  {
    id: "guj-ragda-patties",
    cuisineId: "gujarati",
    name: "Ragda Patties",
    category: "main",
    diet: ["veg"],
    description: "Golden pan-seared potato patties served with warm white pea ragda curry, tamarind, and green chutney.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati.jpg"
  },

  // ================= GUJARATI RASOI =================
  {
    id: "gr-chatpati-roti",
    cuisineId: "gujarati-rasoi",
    name: "Chatpati Roti",
    category: "main",
    diet: ["veg", "jain"],
    description: "Warm puffed whole wheat roti spiced with cumin, ajwain, and pure ghee.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-gatta-sabji",
    cuisineId: "gujarati-rasoi",
    name: "Gatta Sabji",
    category: "main",
    diet: ["veg", "jain"],
    description: "Steamed spiced gram flour gattas simmered in a silky yogurt, cumin, and coriander gravy.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-peru-sabji",
    cuisineId: "gujarati-rasoi",
    name: "Peru Sabji",
    category: "main",
    diet: ["veg", "jain"],
    description: "A rare Gujarati royal delicacy made from ripe guavas stewed in a sweet, sour, and spiced curry with jaggery.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-fada-khichdi",
    cuisineId: "gujarati-rasoi",
    name: "Fada Khichdi",
    category: "main",
    diet: ["veg", "jain"],
    description: "Slow-cooked broken wheat and yellow lentils simmered with vegetables, ginger, and pure desi ghee.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-dahi-vaghar",
    cuisineId: "gujarati-rasoi",
    name: "Dahi Vaghar",
    category: "main",
    diet: ["veg", "jain"],
    description: "Chilled fresh yogurt tempered with mustard seeds, curry leaves, ginger, and green chilies.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-panki-chatani",
    cuisineId: "gujarati-rasoi",
    name: "Panki Chatani",
    category: "starters",
    diet: ["veg", "jain"],
    description: "Delicate fermented rice flour batter steamed between banana leaves, served with tangy mint-coriander chutney.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-paneer-lifafa",
    cuisineId: "gujarati-rasoi",
    name: "Marsha Paneer Lifafa",
    category: "starters",
    diet: ["veg"],
    description: "Spiced paneer filling wrapped into thin roti parcels and roasted crisp with butter.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-rabdi",
    cuisineId: "gujarati-rasoi",
    name: "Rabdi",
    category: "desserts",
    diet: ["veg", "jain"],
    description: "Rich whole milk slow-simmered until thick and layered, infused with fragrant saffron and pistachios.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-malpua",
    cuisineId: "gujarati-rasoi",
    name: "Malpua",
    category: "desserts",
    diet: ["veg", "jain"],
    description: "Traditional deep-fried sweet pancakes soaked in cardamom-saffron sugar syrup, served warm.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-moong-dal-halwa",
    cuisineId: "gujarati-rasoi",
    name: "Moong Dal Halwa",
    category: "desserts",
    diet: ["veg", "jain"],
    description: "Slow-roasted split yellow lentils cooked with generous desi ghee, milk, mawa, and crushed almonds.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-ras-puri",
    cuisineId: "gujarati-rasoi",
    name: "Ras Puri",
    category: "main",
    diet: ["veg", "jain"],
    description: "Golden puffed whole wheat puris served with chilled pure Alphonso mango pulp.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-vaal-dal",
    cuisineId: "gujarati-rasoi",
    name: "Vaal Dal",
    category: "main",
    diet: ["veg", "jain"],
    description: "Sprouted field beans cooked in a sweet, tangy, and aromatic Gujarati tomato-jaggery broth.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-mogar-dal-sabji",
    cuisineId: "gujarati-rasoi",
    name: "Mogar Dal Sabji",
    category: "main",
    diet: ["veg", "jain"],
    description: "Dry sautéed yellow moong lentils with cumin, green chilies, turmeric, and fresh lime juice.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-karela-kaju-banana",
    cuisineId: "gujarati-rasoi",
    name: "Karela Kaju & Raw Banana Sabji",
    category: "main",
    diet: ["veg", "jain"],
    description: "Crispy bitter gourd tossed with whole cashews, raw banana cubes, and jaggery.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-karela-kaju-potato",
    cuisineId: "gujarati-rasoi",
    name: "Karela Kaju & Potato Sabji",
    category: "main",
    diet: ["veg"],
    description: "Slow-cooked spiced bitter gourd and baby potatoes finished with roasted cashews and amchur.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-gunda-sabji",
    cuisineId: "gujarati-rasoi",
    name: "Gunda Sabji",
    category: "main",
    diet: ["veg", "jain"],
    description: "Fragrant wild bird plum berries stuffed with roasted fenugreek and mustard seed masala.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-khatta-dhokla",
    cuisineId: "gujarati-rasoi",
    name: "Khatta Dhokla",
    category: "starters",
    diet: ["veg", "jain"],
    description: "Traditional white fermented sour rice-dal steamed cakes with cracked black pepper.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },
  {
    id: "gr-sambhariya-bhindi",
    cuisineId: "gujarati-rasoi",
    name: "Sambhariya Bhindi",
    category: "main",
    diet: ["veg", "jain"],
    description: "Tender baby ladyfingers slit and stuffed with roasted gram flour, crushed peanuts, and cumin.",
    priceInfo: "Price on request",
    image: "/images/cuisines/gujarati-rasoi.jpg"
  },

  // ================= RAJASTHANI RASOI =================
  {
    id: "raj-dal-baati-churma",
    cuisineId: "rajasthani-rasoi",
    name: "Dal Baati Churma",
    category: "main",
    diet: ["veg", "jain"],
    description: "Hard wheat baatis baked to perfection and soaked in pure desi ghee, served with panchmel dal and sweet almond churma.",
    priceInfo: "Price on request",
    image: "/images/cuisines/rajasthani-rasoi.jpg"
  },
  {
    id: "raj-gatta-sabji",
    cuisineId: "rajasthani-rasoi",
    name: "Gatta Sabji",
    category: "main",
    diet: ["veg", "jain"],
    description: "Boiled spiced chickpea flour dumplings stewed in a spicy, curd-based Marwari gravy with hing and red chili.",
    priceInfo: "Price on request",
    image: "/images/cuisines/rajasthani-rasoi.jpg"
  },
  {
    id: "raj-ker-sangri",
    cuisineId: "rajasthani-rasoi",
    name: "Ker Sangri Sabji",
    category: "main",
    diet: ["veg", "vegan", "jain"],
    description: "Indigenous desert capers and dried wild beans cooked with dry mango, raisins, red chilies, and mustard oil.",
    priceInfo: "Price on request",
    image: "/images/cuisines/rajasthani-rasoi.jpg"
  },
  {
    id: "raj-methi-papad",
    cuisineId: "rajasthani-rasoi",
    name: "Methi Papad Sabji",
    category: "main",
    diet: ["veg", "jain"],
    description: "Boiled bitter-sweet fenugreek seeds and roasted urad dal papad simmered in a tangy yogurt sauce.",
    priceInfo: "Price on request",
    image: "/images/cuisines/rajasthani-rasoi.jpg"
  },
  {
    id: "raj-mirchi-vada",
    cuisineId: "rajasthani-rasoi",
    name: "Mirchi Vada",
    category: "snacks",
    diet: ["veg"],
    description: "Large mild Jodhpuri green peppers stuffed with tangy spiced potato mash, batter-fried until crispy.",
    priceInfo: "Price on request",
    image: "/images/cuisines/rajasthani-rasoi.jpg"
  },
  {
    id: "raj-dahi-vada",
    cuisineId: "rajasthani-rasoi",
    name: "Dahi Vada",
    category: "starters",
    diet: ["veg", "jain"],
    description: "Melt-in-the-mouth lentil dumplings immersed in sweetened chilled curd, topped with roasted cumin and tamarind chutney.",
    priceInfo: "Price on request",
    image: "/images/cuisines/rajasthani-rasoi.jpg"
  },
  {
    id: "raj-ram-khichdi",
    cuisineId: "rajasthani-rasoi",
    name: "Ram Khichdi",
    category: "main",
    diet: ["veg"],
    description: "Wholesome royal Marwari khichdi prepared with rice, mixed lentils, vegetables, and ghee.",
    priceInfo: "Price on request",
    image: "/images/cuisines/rajasthani-rasoi.jpg"
  },
  {
    id: "raj-crispy-bhindi",
    cuisineId: "rajasthani-rasoi",
    name: "Crispy Bhindi",
    category: "starters",
    diet: ["veg", "vegan", "jain"],
    description: "Finely julienned okra tossed in amchur, gram flour, and chaat masala, fried until wafer-crisp.",
    priceInfo: "Price on request",
    image: "/images/cuisines/rajasthani-rasoi.jpg"
  },

  // ================= PUNJABI RASOI =================
  {
    id: "pun-malai-kofta",
    cuisineId: "punjabi-rasoi",
    name: "Malai Kofta",
    category: "main",
    diet: ["veg"],
    description: "Fried cottage cheese and potato dumplings simmered in an indulgent, velvety cashew-cream gravy with fragrant spices.",
    priceInfo: "Price on request",
    image: "/images/cuisines/punjabi-rasoi.jpg"
  },
  {
    id: "pun-paneer-makhani",
    cuisineId: "punjabi-rasoi",
    name: "Paneer Makhani",
    category: "main",
    diet: ["veg"],
    description: "Cubes of fresh malai paneer simmered in a silky tomato, cashew, and white butter sauce finished with kasuri methi.",
    priceInfo: "Price on request",
    image: "/images/cuisines/punjabi-rasoi.jpg"
  },
  {
    id: "pun-dum-aloo",
    cuisineId: "punjabi-rasoi",
    name: "Dum Aloo",
    category: "main",
    diet: ["veg"],
    description: "Baby potatoes deep-fried and slow-cooked under sealed dum in a rich spiced fennel and yogurt gravy.",
    priceInfo: "Price on request",
    image: "/images/cuisines/punjabi-rasoi.jpg"
  },
  {
    id: "pun-veg-kolhapuri",
    cuisineId: "punjabi-rasoi",
    name: "Veg Kolhapuri",
    category: "main",
    diet: ["veg", "vegan"],
    description: "Assorted seasonal garden vegetables cooked in a spicy, fiery roasted coconut and red chili gravy.",
    priceInfo: "Price on request",
    image: "/images/cuisines/punjabi-rasoi.jpg"
  },
  {
    id: "pun-paneer-bhurji",
    cuisineId: "punjabi-rasoi",
    name: "Paneer Bhurji",
    category: "main",
    diet: ["veg"],
    description: "Crumbled fresh cottage cheese sautéed with onions, tomatoes, ginger, green chilies, and fresh coriander.",
    priceInfo: "Price on request",
    image: "/images/cuisines/punjabi-rasoi.jpg"
  },
  {
    id: "pun-chhole",
    cuisineId: "punjabi-rasoi",
    name: "Chhole",
    category: "main",
    diet: ["veg", "vegan"],
    description: "Authentic Amritsari chickpeas cooked slowly with whole spices, black tea, and dried pomegranate seeds.",
    priceInfo: "Price on request",
    image: "/images/cuisines/punjabi-rasoi.jpg"
  },
  {
    id: "pun-black-chhole",
    cuisineId: "punjabi-rasoi",
    name: "Black Chhole",
    category: "main",
    diet: ["veg", "vegan"],
    description: "Dry roasted black chickpeas tempered with cumin, ginger juliennes, and tangy amchur.",
    priceInfo: "Price on request",
    image: "/images/cuisines/punjabi-rasoi.jpg"
  },
  {
    id: "pun-dal-makhani",
    cuisineId: "punjabi-rasoi",
    name: "Dal Makhani",
    category: "main",
    diet: ["veg"],
    description: "Whole black lentils and kidney beans simmered overnight with tomatoes, ginger, and garlic, finished with rich butter and cream.",
    priceInfo: "Price on request",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJgYWH3Uu5hbY4H0QFsALcizBecVlIfuuV3yB2TDsshoZS0dr5S28VzRGlgcvLXX_BmhZbhXVmbgLii8-AjybZT49IxKE4q6H6rScc0Eg3D8udqDXZKIElRmcV1SFaT-FZSZpCzF7GxQ8Wq5feu78KbSqIbnq2ET3UHtmHrWfT8LAIAfoLP_LvxeP_vGZVKB1RlJ1g05PcVDB6aMM35yJz3m7hWjkFB8StUGoD3H9u60dZdQoqcR7S"
  }
];

export const OCCASIONS = [
  { id: "birthday", title: "Birthday", subtitle: "Celebratory tasting menu & artisanal dessert pairing", icon: "cake" },
  { id: "wedding", title: "Wedding", subtitle: "Grand royal dining with bespoke multi-course service", icon: "favorite" },
  { id: "engagement", title: "Engagement", subtitle: "Sophisticated celebration with signature passed hors d'oeuvres", icon: "diamond" },
  { id: "family-gathering", title: "Family Gathering", subtitle: "Warm, communal regional heritage feast", icon: "groups" },
  { id: "house-party", title: "House Party", subtitle: "Contemporary casual luxury with live station options", icon: "celebration" },
  { id: "corporate-event", title: "Corporate Event", subtitle: "Refined dining executive catering for distinguished guests", icon: "business_center" },
  { id: "private-dinner", title: "Private Dinner", subtitle: "Intimate chef's table experience for select company", icon: "dinner_dining" },
  { id: "other", title: "Other Special Occasion", subtitle: "Fully customized culinary vision crafted to your preference", icon: "auto_awesome" }
];

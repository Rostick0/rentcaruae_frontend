export default defineI18nConfig(() => ({
  messages: {
    en: {
      faq: {
        title1: "Getting started",
        question1: "What documents do I need for car rental in the UAE?",
        answer1: {
          0: "The necessary documents for renting a car in the UAE vary depending on whether you're a tourist or a resident. Here’s what you’ll need: ",
          1: "For tourists:",
          2: "A valid international driving permit.",
          3: "Your passport.",
          4: "A form of payment, such as a credit or debit card, or cash.",
          5: "For UAE residents:",
          6: "A valid UAE driving license.",
          7: "Your passport.",
          8: "A resident visa.",
          9: "An Emirates ID.",
          10: "Payment options including cash, credit, or debit card.",
        },
        question2: "Getting Started Can I rent a car without a credit card?",
        answer2:
          "Absolutely! You can make a cash deposit instead. However, keep in mind that this deposit will typically be returned only 21 to 26 days after you return the vehicle. This time frame accounts for any fines that might still be issued after the car is back in our possession.",
        question3: "How long does It take to get a rental car delivered?",
        answer3:
          "Delivery times can vary based on your location, the time of day, and current traffic conditions. For example, morning rush hours can lead to delays, while afternoons might see quicker deliveries since most commuters are at work. On average, you can expect delivery to take anywhere from 45 minutes to 2 hours. It's always a good idea to check with a company representative to ensure there are no unexpected delays.",
        question4: "Can I pick up my rental car from Dubai airport?",
        answer4:
          "Yes, we can deliver the car directly to the airport for you. Please note that there is an additional fee for this service, starting at a minimum of 126 AED.",
        question5: "Can I rent a car with a new driving license in the UAE?",
        answer5:
          "Yes, it’s acceptable. Keep in mind that you should follow local traffic rules.",
        question6: "What should I do if I have an accident in a rental car?",
        answer6: {
          0: "In the unfortunate event of an accident, your first step is to contact the police to file a report. For minor accidents, you can also use the police application to submit your report.",
          1: "Afterward, be sure to notify the rental company’s representative. Obtaining a detailed accident report is crucial, as insurance claims typically require this documentation; without it, you may be responsible for covering the damage yourself.",
        },
      },
      // main page
      rentCarInDubai: "Rent a car in Dubai",
      bookCar: "Book a car for a day or a month without commission",
      searchCarBrandOrModel: "Search a car by brand or model",
      mostWantedCarBrands: "Most wanted car brands in Dubai",
      allBrands: "All brands",
      economyCars: "Economy cars",
      allEconomyCars: "All Economy cars",
      vanCars: "Van cars",
      allVanCars: "All Van cars",
      SUVForRent: "SUV for rent",
      allSUV: "All SUV",
      cabrioCars: "Cabrio cars",
      allCabrioCars: "All Cabrio cars",
      businessCars: "Business cars",
      allBusinessCars: "All Business cars",
      luxuryCars: "Luxury cars",
      allLuxuryCars: "All Luxury cars",
      electroCars: "Electro cars",
      allElectroCars: "All Electro cars",
      allNews: "All news",

      // sitemap
      sitemap: "Sitemap",
      sitemapTitle: "Sitemap - Rent a Car",
      sitemapAmpTitle: "Sitemap Amp - Rent a Car",

      // 404
      404: {
        error: "Error",
        pageNotFound: "Page not found",
        goMain: "Go main",
      },

      // blogs
      blogs: {
        carRentalBlog: "Car Rental Blog",
        News: "News",
        Reviews: "Reviews",
        "Good to know": "Good to know",
        pageTitle: "RentcarUAE Car Rental Blog | Your adventure begins here",
        description:
          "All about car rental in Dubai. Reviews of new car manufacturers that can already be tested",
      },

      // company
      company: {
        view_on_map: "View on map",
        whats_app: "WhatsApp",
      },

      // week days
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday",
      Saturday: "Saturday",
      Sunday: "Sunday",

      bodyTypesList: {
        allCars: "All Cars",
        Coupe: "Coupe",
        Roadster: "Roadster",
        Sedan: "Sedan",
        Hatchback: "Hatchback",
        SUV: "SUV",
        Wagon: "Wagon",
        Cabrio: "Cabrio",
        Targa: "Targa",
        Liftback: "Liftback",
        VAN: "VAN",
        Speedster: "Speedster",
        Limousine: "Limousine",
        Fastback: "Fastback",
        Pickup: "Pickup",
      },

      filter: {
        from: "from",
      },

      // сities
      cities: {
        "Abu Dhabi": "Abu Dhabi",
        "Al Ain": "Al Ain",
        Ajman: "Ajman",
        Dubai: "Dubai",
        Fujairah: "Fujairah",
        "Ras al-Khaimah": "Ras al-Khaimah",
        Sarjah: "Sarjah",
        "Umm al-Quwain": "Umm al-Quwain",
      },

      rentalPeriod: {
        "Daily rental": "Daily rental",
        "Weekly rental": "Weekly rental",
        "Monthly rental": "Monthly rental",
        "Car leasing": "Car leasing",
      },
      rentalPricing: {
        title: "Rental pricing",
        ViewDailyOffer: "View daily offer",
        ViewMounthlyOffer: "View mounthly offer",
      },

      modal: {
        auth: {
          title: "Auth",
          subtitle: "For Rent a car companies",
          email: {
            label: "Work email",
          },
          code: {
            label: "Enter pin code",
          },
        },
        register: {
          title: "Become a partnership",
          subtitle: "For Rent a car companies",
          sendRequest: "Send a request",
          company_name: {
            label: "Company Name",
            placeholder: "My Company",
          },
          company_website: {
            label: "Company Website",
            placeholder: "https://",
          },
          company_city_id: {
            label: "City",
            placeholder: "City",
          },
          full_name: {
            label: "Full Name",
            placeholder: "Full Name",
          },
          tel: {
            label: "Phone number",
          },
          email: {
            label: "Work email",
            placeholder: "email@company_name.com",
          },
          code: {
            label: "Enter pin code",
            placeholder: "Pin code",
          },
        },

        dontSendCode: "Code don't sended",
      },

      modalCookie: {
        title1: "Technical",
        description1:
          "provides authentication, navigation and other important functions. Their absence may disrupt the operation of RenrCarUAE sites and services, so they are used by default.",
        title2: "Analytical/marketing",
        description2:
          "improve the quality of work with RentCarUAE services. They remember preference settings, anonymously analyze site traffic and allow you to display relevant ads.",
        title3: "Other cookies",
        description3:
          "perform service functions and make it easier to work with RentCarUAE sites and services. These files help you remember the page status, select a region, save personal preferences, and more.",
        description4:
          "RentCarUAE uses cookies: technical, analytical, marketing and others. They are necessary for the optimal operation of sites and services, help RentCarUAE recognize you and store your settings. Read more in the",
      },

      noInternet: {
        problem: "The internet connection is probably interrupted",
        tryAgain: "Try again",
      },

      pwa: {
        "pre-title": "Add to home screen",
        title: "Install RentCarUAE App",
        tapOnThe: "Tap on the",
        Share: "Share",
        buttonBelow: "button below",
        Select: "Select",
        addHomeScreen: "Add to Home Screen",
        Add: "Add",
        pushNotifecations: "Push notifecations",
        fullscreenBrowsing: "Fullscreen browsing",
        improvedPerformance: "Improved performance",
      },

      categoriesList: {
        Economy: "Economy",
        Minivan: "Minivan",
        SUV: "SUV",
        Cabrio: "Cabrio",
        Business: "Business",
        Luxury: "Luxury",
        Sports: "Sports",
        "Electric (EV)": "Electric (EV)",
        Premium: "Premium",
        Comfort: "Comfort",
      },

      calc: {
        rentalOffer: "rental offer",
        selectedPeriod: "Selected period",
        Deposit: "Deposit",
        FREE: "FREE",
        perDay: "per day",
        minRentalPeriod: "Minimum rental period",
        totalMileageLimit: "Total mileage limit",
        km: "km",
        day: "day",
        days: "days",
        serviceMaintenance: "Service and maintenance",
        Free: "Free",
        basicInsurance: "Basic insurance",
        WhatsApp: "WhatsApp",
        Book: "Book",
        chooseRentalDates: "Choose rental dates",
        startDate: "Start date",
        yourRental: "Your rental",
        carDelivery: "Car delivery",
        monthlyPayment: "Monthly payment",
        monthlyPrice: "Monthly price",
        thankApplication: "Thank you for your application",
      },

      bookForm: {
        bookingDetails: "Your booking details",
        tel: {
          label: "Phone number",
        },
        full_name: {
          label: "Full Name",
        },
        email: {
          label: "E-mail",
        },
        TickingBoxAgree: "By ticking this box, you agree to the",
        includingCookie: "including cookie use.",
        and: "and",
        Show: "Show",
        all: "all",
      },

      thankBooking: "Thank you for booking",
      representativeWillContact:
        "A company representative will contact you within 1 hour",

      Specifications: "Specifications",
      specifications: {
        types: {
          safety: "safety",
          multimedia: "multimedia",
          comfort: "comfort",
        },
        names: {
          "Parking sensores": "Parking sensores",
          "Rear Camera": "Rear Camera",
          Isofix: "Isofix",
          "Camera 360": "Camera 360",
          Navigation: "Navigation",
          "Apple CarPlay": "Apple CarPlay",
          "Cruise Control": "Cruise Control",
          "Basic Autopilot": "Basic Autopilot",
          SunRoof: "SunRoof",
        },
      },

      fuelTypes: {
        Petrol: "Petrol",
        Hybrid: "Hybrid",
        Electro: "Electro",
        Diesel: "Diesel",
      },

      transmissions: {
        Automatic: "Automatic",
        Mechanical: "Mechanical",
      },

      carCard: {
        MileageDM: "Mileage day/mo",
        rentNow: "Rent now",
      },

      carCardModule: {
        dayRentalAvailable: "1 day rental available",
        depositfreeOption: "Deposit-free option",
        freeDelivery: "Free delivery",
      },

      carCardItem: {
        From: "From",
      },

      // universal
      rentCar: "Rent car",
      home: "Home",
      Brand: "Brand",
      brands: "Brands",
      categories: "Categories",
      Body: "Body",
      bodies: "Bodies",
      bodyTypes: "Body Types",
      period: "Period",
      aboutUs: "About us",
      rentalByPeriod: "Rental by period",
      blog: "Blog",
      Policy: "Policy",
      privacyPolicy: "Privacy policy",
      termsService: "Terms of Service",
      termsOfUse: "Terms of use",
      siteMap: "Site map",
      FAQ: "FAQ",
      contactUs: "Contact us",
      followUs: "Follow us",
      carRentalCompany: "Are you a car rental company?",
      Login: "Login",
      Active: "Active",
      None: "None",
      Hide: "Hide",
      showMore: "Show more",
      Customize: "Customize",
      Accept: "Accept",
      VAT: "VAT",
      Tax: "Tax",
      Applicable: "Applicable",
      Total: "Total",
      depositeFree: "Deposite free",
      daily: "daily",
      weekly: "weekly",
      monthly: "monthly",
      day: "day",
      days: "days",
      month: "month",
      months: "months",
      NEW: "NEW",
      specialOffer: "Special offer",
      Person: "Person",
      Minimum: "Minimum",
      Close: "Close",
      joinUs: "Join us",
    },
    fr: {
      faq: {
        title1: "Pour commencer",
      },
    },
    de: {
      faq: {
        title1: "Erste Schritte",
      },
    },
  },
}));

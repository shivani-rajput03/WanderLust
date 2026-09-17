# 🏡 WanderLust

WanderLust is a full-stack accommodation listing web application inspired by Airbnb-style platforms. It allows users to explore property listings, search destinations, filter listings by category, view locations on an interactive map, create and manage their own listings, upload images, and add reviews.

> **Project Type:** Full-Stack Web Application  
> **Status:** Core features implemented  
> **Purpose:** Educational and learning project

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Objectives](#-objectives)
- [Features](#-features)
- [Application Workflow](#-application-workflow)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Database](#-database)
- [Image Upload](#-image-upload)
- [Maps and Geocoding](#-maps-and-geocoding)
- [Authentication and Authorization](#-authentication-and-authorization)
- [Search and Category Filtering](#-search-and-category-filtering)
- [Reviews and Ratings](#-reviews-and-ratings)
- [Tax Calculation](#-tax-calculation)
- [Validation and Error Handling](#-validation-and-error-handling)
- [Security](#-security)
- [Git and GitHub](#-git-and-github)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [Learning Outcomes](#-learning-outcomes)
- [Author](#-author)
- [License](#-license)

---

## 📌 About the Project

WanderLust is a full-stack web application developed to demonstrate the practical implementation of a modern property-listing platform.

Users can browse available properties, search for destinations, filter listings using categories, view property locations on a map, and access detailed listing pages.

Authenticated users can create their own listings, upload images, edit or delete their listings, and add reviews.

The application uses:

- **Node.js and Express.js** for the backend
- **EJS and Bootstrap** for the frontend
- **MongoDB Atlas** for cloud database storage
- **Cloudinary** for image storage
- **Mapbox** for maps and geocoding
- **Passport.js** for authentication

---

## 🎯 Objectives

The main objectives of the project are:

1. Develop a complete full-stack web application.
2. Implement user authentication and authorization.
3. Provide CRUD operations for property listings.
4. Implement image uploading using cloud storage.
5. Implement search and category filtering.
6. Integrate interactive maps and geocoding.
7. Store application data using MongoDB Atlas.
8. Implement persistent user sessions.
9. Implement reviews and ratings.
10. Create a responsive and user-friendly interface.
11. Practice Git and GitHub based project management.

---

# ✨ Features

## 👤 User Authentication

- User signup
- User login
- User logout
- Session-based authentication
- Protected routes
- Authorization based on listing ownership

## 🏠 Listing Management

Users can:

- View all listings
- View individual listing details
- Create a new listing
- Edit their listings
- Delete their listings
- Upload listing images
- Update listing images

Each listing contains information such as:

- Title
- Description
- Price
- Location
- Country
- Category
- Image
- Owner
- Reviews
- Geographic coordinates

## 🖼️ Image Upload

The application supports:

- Image selection
- Image preview
- Image upload
- Cloudinary storage
- Displaying uploaded images
- Replacing images while editing listings

## 🔎 Search

Users can search listings by:

- Listing title
- Location
- Country

The search is case-insensitive.

## 🏷️ Category Filtering

Listings can be filtered using categories such as:

- Trending
- Rooms
- Iconic Cities
- Mountains
- Castles
- Amazing Pools
- Camping
- Arctic
- Farms
- Beach

The interface also includes category navigation and horizontal scrolling.

## 💰 Tax Calculation

A **Total after taxes** switch is available on the listings page.

When enabled, the displayed price is calculated with an additional 18% tax.

Example:

```text
Original price = ₹1,000

Price after 18% tax = ₹1,180
```

## ⭐ Reviews and Ratings

Users can:

- Add reviews
- Give ratings from 1 to 5
- View reviews
- Delete reviews where authorized

## 🗺️ Interactive Maps

Mapbox is integrated to provide:

- Location geocoding
- Interactive maps
- Listing markers
- Listing popups

## ☁️ Cloud Database

MongoDB Atlas stores:

- Users
- Listings
- Reviews
- Sessions

## 🔐 Persistent Sessions

Sessions are stored in MongoDB using `connect-mongo`.

This allows authenticated sessions to be stored in the database rather than relying only on temporary server memory.

---

# 🔄 Application Workflow

The main application flow is:

```text
                User
                  │
                  ▼
            WanderLust UI
                  │
                  ▼
           Express Routes
                  │
          ┌───────┴────────┐
          │                │
          ▼                ▼
 Authentication       Validation
          │                │
          └───────┬────────┘
                  ▼
             Controllers
                  │
        ┌─────────┼─────────┐
        │         │         │
        ▼         ▼         ▼
   MongoDB    Cloudinary   Mapbox
    Atlas      Images     Geocoding
        │         │         │
        └─────────┼─────────┘
                  ▼
              Response
                  │
                  ▼
             WanderLust UI
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling |
| JavaScript | Client-side functionality |
| Bootstrap | Responsive UI |
| EJS | Server-side templates |
| EJS-Mate | EJS layouts |
| Font Awesome | Icons |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |

## Database

| Technology | Purpose |
|---|---|
| MongoDB | Database |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB ODM |

## Authentication

| Technology | Purpose |
|---|---|
| Passport.js | Authentication framework |
| Passport Local | Local authentication |
| Passport Local Mongoose | User authentication helpers |
| Express Session | Session management |
| Connect Mongo | MongoDB session storage |

## External Services

| Service | Purpose |
|---|---|
| Cloudinary | Image storage |
| Mapbox | Maps and geocoding |

## Other Packages

| Package | Purpose |
|---|---|
| Joi | Data validation |
| Multer | File upload handling |
| Multer Storage Cloudinary | Cloudinary file storage |
| Method Override | PUT/DELETE form requests |
| Connect Flash | Flash messages |
| Cookie Parser | Cookie handling |
| Dotenv | Environment variables |

## Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

# 🏗️ Project Architecture

The project follows an MVC-style structure.

```text
                    WanderLust
                        │
              ┌─────────┼─────────┐
              │         │         │
              ▼         ▼         ▼
            Views   Controllers  Models
              │         │         │
              │         │         │
             EJS      Logic     Mongoose
              │         │         │
              └─────────┼─────────┘
                        │
                      Routes
                        │
                        ▼
                    Express App
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
       MongoDB Atlas          External APIs
                                   │
                         ┌─────────┴─────────┐
                         │                   │
                         ▼                   ▼
                     Cloudinary           Mapbox
```

---

# 📂 Project Structure

```text
WanderLust/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── flash.ejs
│   │   └── footer.ejs
│   │
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   │
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   │
│   └── error.ejs
│
├── public/
│   ├── css/
│   │   ├── style.css
│   │   └── rating.css
│   │
│   └── js/
│       └── script.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── utils/
│   ├── Expresserror.js
│   └── wrapAsync.js
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/shivani-rajput03/WanderLust.git
```

## 2. Move into the Project Directory

```bash
cd WanderLust
```

## 3. Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

Add your own credentials:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token

SECRET=your_session_secret
```

### Environment Variables

| Variable | Description |
|---|---|
| `ATLASDB_URL` | MongoDB Atlas connection string |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `MAP_TOKEN` | Mapbox access token |
| `SECRET` | Express session secret |

**Never publish actual credentials in the repository.**

---

# ▶️ Running the Application

Start the server using:

```bash
npm start
```

The application runs on:

```text
http://localhost:8080
```

Open the URL in a browser.

---

# 🗄️ Database

The application uses **MongoDB Atlas** as the cloud database.

The main collections are:

```text
users
listings
reviews
sessions
```

Mongoose is used to define schemas and communicate with MongoDB.

---

# 🖼️ Image Upload

Cloudinary is used to store listing images.

The image upload process is:

```text
User selects image
        ↓
Multer receives image
        ↓
Cloudinary Storage
        ↓
Cloudinary
        ↓
Image URL + filename
        ↓
MongoDB Listing
```

The listing document stores the image URL and filename rather than storing the actual image file inside the project.

---

# 🗺️ Maps and Geocoding

Mapbox provides map and geocoding functionality.

When a user enters a listing location:

```text
Location
   ↓
Mapbox Geocoding API
   ↓
Coordinates
   ↓
MongoDB
   ↓
Mapbox Map
   ↓
Marker + Popup
```

The listing stores geographic information using a Point geometry:

```text
geometry
├── type: "Point"
└── coordinates: [longitude, latitude]
```

The map is displayed on the listing details page.

---

# 🔐 Authentication and Authorization

Authentication is implemented using Passport.js.

### Authentication

Authentication determines:

> Who is the logged-in user?

The application supports:

- Signup
- Login
- Logout
- Sessions

### Authorization

Authorization determines:

> Is the logged-in user allowed to perform this action?

For example, only the owner of a listing can edit or delete it.

---

# 🔎 Search and Category Filtering

## Search

The search functionality checks:

```text
Title
Location
Country
```

The search is case-insensitive.

## Categories

Users can select categories from the category navigation bar.

The application supports:

```text
All
Trending
Rooms
Iconic Cities
Mountains
Castles
Amazing Pools
Camping
Arctic
Farms
Beach
```

Selecting a category displays listings belonging to that category.

---

# ⭐ Reviews and Ratings

Reviews are associated with listings using MongoDB references.

A review contains:

```text
Review
├── rating
├── comment
├── author
└── listing
```

Ratings are restricted to:

```text
1 to 5
```

Users can add reviews and authorized users can delete them.

When a listing is deleted, associated reviews can also be removed through the Mongoose relationship handling implemented in the project.

---

# 💰 Tax Calculation

The application provides a **Total after taxes** switch.

### Tax disabled

The original listing price is displayed.

### Tax enabled

The application calculates:

```text
Tax-inclusive price = Original price × 1.18
```

Example:

```text
Original price: ₹2,000

Tax-inclusive price:
₹2,000 × 1.18 = ₹2,360
```

The calculation changes the displayed price without changing the stored base price in MongoDB.

---

# ✅ Validation and Error Handling

The project uses **Joi** for validating listing and review data.

Examples of validated fields include:

### Listing

- Title
- Description
- Location
- Country
- Price
- Category

### Review

- Rating
- Comment

The project also uses custom error handling and an asynchronous wrapper to simplify error management in Express routes.

---

# 🔒 Security

The application follows basic security practices such as:

- Authentication using Passport
- Authorization using ownership checks
- Joi input validation
- Protected routes
- Environment variables
- MongoDB session storage
- `.gitignore` for sensitive files

The `.gitignore` file excludes:

```text
node_modules/
.env
.DS_Store
```

Sensitive credentials should never be committed to GitHub.

---

# 📦 Important Project Commands

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm start
```

Initialize sample listings:

```bash
node init/index.js
```

> **Warning:** The initialization script deletes existing listings before inserting sample data. Do not run it against a database containing listings you want to keep.

---

# 🐙 Git and GitHub

The project is maintained using Git.

GitHub repository:

https://github.com/shivani-rajput03/WanderLust

Basic Git workflow:

```bash
git add .
git commit -m "Your commit message"
git push
```

The `.env` file is excluded from Git using `.gitignore`.

---

# 🚀 Deployment

The application can be deployed to a Node.js-compatible hosting platform.

For production deployment:

1. Connect the GitHub repository to the hosting platform.
2. Install dependencies using:

```bash
npm install
```

3. Start the application using:

```bash
npm start
```

4. Configure the required environment variables in the hosting platform.

Required environment variables:

```text
ATLASDB_URL
CLOUD_NAME
CLOUD_API_KEY
CLOUD_API_SECRET
MAP_TOKEN
SECRET
```

The `.env` file should not be uploaded to the deployment platform through Git. Configure environment variables through the platform's environment-variable settings.

---

# 🔮 Future Enhancements

Possible future improvements include:

- User profile management
- Wishlist/favorites
- Booking functionality
- Multiple images per listing
- Advanced filters
- Price range filtering
- Improved map interactions
- Improved review system
- Email notifications
- Admin dashboard
- Production deployment
- Improved mobile experience
- Pagination for large numbers of listings

---

# 📚 Learning Outcomes

Through this project, the following concepts are demonstrated:

- Full-stack web development
- Node.js
- Express.js
- MVC architecture
- RESTful routing
- EJS templating
- Bootstrap
- JavaScript
- MongoDB
- MongoDB Atlas
- Mongoose
- CRUD operations
- User authentication
- Authorization
- Session management
- File uploads
- Cloudinary
- Mapbox
- Geocoding
- Joi validation
- Search functionality
- Category filtering
- Reviews and ratings
- Git
- GitHub
- Environment variable management

---

## 👩‍💻 Author

### Shivani Rajput
**Computer Science and Engineering Student**

🔗 [GitHub: shivani-rajput03](https://github.com/shivani-rajput03)  
🔗 [LinkedIn: Shivani Rajput](https://www.linkedin.com/in/shivani-rajput-042046342)

> Built as an academic project to understand full-stack web development, database management, authentication, cloud storage, maps, and deployment.

---

# 📄 License

This project was developed for educational and learning purposes.

The project is independently maintained by the author.

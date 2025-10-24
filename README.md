# URL Shortener API

Build a URL shortener API using Node.js, Express.js, and MongoDB. We can call the API ShortIt.

## Required Features

- Should be able to create a short URL from a long URL
- Should be able to edit a long URL
- Should be able to delete a long URL and short URL
- Should be able to get all URLs
- Should be able to get a single URL
- Should be able to use custom names for short URLs

## Model

This is the suggested model for the URL shortener. Feel free to modify it to suit your needs.

```js
const shortenedURLSchema = new mongoose.Schema({
  customName: {
    type: String,
    unique: true, // Ensure custom names are unique
    sparse: true // Allow null (empty) values for custom names
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  originalUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

## Required Endpoints

### POST /api/v1/shorten

This endpoint should create a short URL from a long URL.

#### Considerations

- Make sure this route is validated to ensure that the longUrl is available and valid.
- The customName is optional, but if provided, it must be a string with length of atleast 5 letters.
- If the user provides a custom name, use it as the shortUrl. Otherwise, generate a random string of 5 characters.
- If the user provides a custom name that already exists, return an error.
- If the custom name has spaces, replace the spaces with dashes before adding it to the url. Save the custom name with spaces into the database.
- If longUrl already exists, return the existing shortUrl, don't create a new record.

```js
const requestBody1 = {
  url: 'https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome..69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8'
}

const successResponse1 = {
  message: 'Url shortened successfully',
  data: {
    id: 'MongoDBId'
    shortUrl: 'https://shortit/1D2Q3',
  }
}

const requestBody2 = {
  url: 'https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome..69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8',
  customName: 'bike hike trip'
}

const successResponse1 = {
  message: 'Url shortened successfully',
  data: {
    id: 'MongoDBId'
    shortUrl: 'https://shortit/bike-hike-trip',
  }
}
```

### GET /api/v1/urls

This endpoint should return all the URLs in the database.

#### Considerations

- If there are no URLs in the database, return an empty array.

```js
const successResponse = [
  {
    id: "MongoDBId",
    originalUrl:
      "https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8",
    shortUrl: "https://shortit/1qWegH",
    createdAt: "2020-01-01T00:00:00.000Z"
  },
  {
    id: "MongoDBId",
    customName: "bike hike trip",
    originalUrl:
      "https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8",
    shortUrl: "https://shortit/bike-hike-trip",
    createdAt: "2020-01-01T00:00:00.000Z"
  },
  {
    id: "MongoDBId",
    customName: "waffles",
    originalUrl:
      "https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8",
    shortUrl: "https://shortit/waffles",
    createdAt: "2020-01-01T00:00:00.000Z"
  }
];
```

### GET /api/v1/urls/:id

This endpoint should return a single URL from the database.

#### Considerations

- If the id is not found, return an error.

```js
const successResponse = {
  id: "MongoDBId",
  customName: "waffles",
  originalUrl:
    "https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8",
  shortUrl: "https://shortit/waffles",
  createdAt: "2020-01-01T00:00:00.000Z"
};
```

### PUT /api/v1/urls/:id

This endpoint should update a single URL from the database.

#### Considerations

- If the id is not found, return an error.
- If the customName is provided, it must be a string with length of atleast 5 letters.
- If the customName has spaces, replace the spaces with dashes before adding it to the url. Save the custom name with spaces into the database.
- None of the fields are required. if a custom name is provided, update the custom name and shortUrl. If an url is provided, update only the originalUrl.
- If the url is provided, validate it to ensure that it is valid.

```js
const requestBody1 = {
  customName: "marathon bike hike trip",
  url:
    "https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome..69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8"
};

const successResponse = {
  message: "Url updated successfully",
  data: {
    id: "MongoDBId",
    customName: "marathon bike hike trip",
    originalUrl:
      "https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8",
    shortUrl: "https://shortit/marathon-bike-hike-trip",
    createdAt: "2020-01-01T00:00:00.000Z"
  }
};

const requestBody2 = {
  customName: "marathon bike hike trip"
};

const successResponse = {
  message: "Url updated successfully",
  data: {
    id: "MongoDBId",
    customName: "marathon bike hike trip",
    originalUrl:
      "https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8",
    shortUrl: "https://shortit/marathon-bike-hike-trip",
    createdAt: "2020-01-01T00:00:00.000Z"
  }
};
```

### DELETE /api/v1/urls/:id

This endpoint should delete a single URL from the database.

#### Considerations

- If the id is not found, return an error.

```js
const successResponse = {
  message: "Url deleted successfully",
  data: {
    id: "MongoDBId",
    customName: "marathon bike hike trip",
    originalUrl:
      "https://www.google.com/search?q=google+url+shortener&oq=google+url+shortener&aqs=chrome69i57j0l5.3808j0j7&sourceid=chrome&ie=UTF-8",
    shortUrl: "https://shortit/marathon-bike-hike-trip",
    createdAt: "2020-01-01T00:00:00.000Z"
  }
};
```

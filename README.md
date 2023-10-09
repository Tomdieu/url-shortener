# Trix URL Shortener

[App Screenshot](./public/Screenshot.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a URL shortener web application built with Next.js, Prisma, and PostgreSQL. It allows users to shorten long URLs into easily shareable and manageable links.

## Features

- Shorten long URLs into compact, user-friendly links.
- Track the number of clicks on each shortened link.
- User registration and authentication for managing links.
- Admin dashboard for viewing link analytics.
- Easy-to-use and responsive user interface.

## Demo

You can access a live demo of the application at [https://trixurl.vercel.app/](https://trixurl.vercel.app/).

## Installation

To run the application locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/tomdieu/url-shortener.git
   ```

2. Navigate to the project directory:

    ```bash
    cd url-shortener
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a .env.local file in the root directory and add your environment variables, including your PostgreSQL database connection details, API keys, and other necessary configurations.

5. Run the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and access the app at `http://localhost:3000`.

## Usage

- Register or log in to your account.
- Shorten a URL by pasting it into the input field and clicking "Shorten."
- View and manage your shortened links.
- Access link analytics and click statistics.

## Technologies Used

- `Next.js 13`
- `Prisma`
- `PostgreSQL`
- `Tailwind CSS`
- `Authentication: NextAuth.js`
- `Deployment: Vercel`

## Contributing

Contributions are welcome! Please refer to the `Contribution Guidelines` for details on how to contribute to this project.

## License

This project is licensed under the `MIT License`.

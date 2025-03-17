# Web AAT Project

A web application that showcases blogs for different sectors with an automatic blog generation feature using the Google Gemini API.

## Features

- Display blogs by sector
- Contact form submission
- Automatic blog generation using Google Gemini API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/YashwanthCH18/final-web-aat.git
cd final-web-aat
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
   - Copy the `.env.example` file to `.env`
   - Add your Gemini API key to the `.env` file:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   - You can obtain a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Usage

### Viewing Blogs
- Navigate to `/blogs/[sector]` to view blogs for a specific sector
- Available sectors include: technology, finance, healthcare, education, etc.

### Generating Blogs
- Click on the "Generate New Blog" button on any sector page to automatically generate a new blog post for that sector using the Gemini API

### Contact Form
- Navigate to the contact page to submit inquiries

## Technologies Used

- React
- TypeScript
- Node.js
- Express
- Google Gemini API
- Tailwind CSS
- Framer Motion

## License

This project is licensed under the MIT License - see the LICENSE file for details.

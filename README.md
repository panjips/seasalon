# SeaSalon

SeaSalon is a salon management application that allows users to make reservations for various salon services. This project uses Prisma ORM, PostgreSQL database, and Next.js framework.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/seasalon.git
    cd seasalon
    ```

2. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file in the root directory and add the following environment variables:

    ```env
    DATABASE_URL="postgresql://gamecenter1920:e0ib6stJuELP@ep-royal-star-a1xmfsu4.ap-southeast-1.aws.neon.tech/seasalon?sslmode=require"
    SECRET_KEY="KA5uurZrQ8Nhyhl+fgnOAP4ri8pZKqj55clLsCcSIqU="
    ```

4. Set up the database:

    ```sh
    npx prisma migrate dev --name init
    ```

5. Generate Prisma Client:

    ```sh
    npx prisma generate
    ```

### Running the Application

To run the application in development mode:

```sh
npm run dev
# or
yarn dev

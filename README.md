
### README for Interaction Service

```markdown
# Interaction Service

This service handles interactions with discussions such as liking, commenting, replying to comments.

## Prerequisites

- Node.js
- PostgreSQL
- Docker (optional, for running PostgreSQL in a container)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd interaction-service
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Configuration

Create a `.env` file in the root directory and set the environment variables:
```env
DB_USER=gaurav
DB_HOST=localhost
DB_NAME=interaction_service_db
DB_PASSWORD=gaurav
DB_PORT=5438
JWT_SECRET=your_jwt_secret
PORT=3003
USER_SERVICE_PORT=3001
DISCUSSION_SERVICE_PORT=3002

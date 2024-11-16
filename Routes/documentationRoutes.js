// documentationRoutes.js
import express from "express";
const router = express.Router();

// Serve the documentation at /api/docs
router.get("/api/docs", (req, res) => {
  const collection = {
    info: {
      name: "Car Management API Documentation",
      description:
        "API documentation for car management system with authentication and product management",
      version: "1.0.0",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: [
      {
        name: "Authentication",
        item: [
          {
            name: "Register User",
            request: {
              method: "POST",
              url: "https://car-management-backend-iwy1.onrender.com/auth/register",
              description: "Register a new user",
              header: [
                {
                  key: "Content-Type",
                  value: "application/json",
                },
              ],
              body: {
                mode: "raw",
                raw: JSON.stringify(
                  {
                    username: "testuser",
                    email: "test@example.com",
                    password: "password123",
                  },
                  null,
                  2
                ),
                options: {
                  raw: {
                    language: "json",
                  },
                },
              },
            },
            response: [
              {
                name: "Success Response",
                status: "Created",
                code: 201,
                body: "User registered successfully",
              },
              {
                name: "Error Response - Server Error",
                status: "Internal Server Error",
                code: 500,
                body: "Error registering user: [error message]",
              },
            ],
          },
          {
            name: "Login User",
            request: {
              method: "POST",
              url: "https://car-management-backend-iwy1.onrender.com/auth/login",
              description: "Login with existing credentials",
              header: [
                {
                  key: "Content-Type",
                  value: "application/json",
                },
              ],
              body: {
                mode: "raw",
                raw: JSON.stringify(
                  {
                    email: "test@example.com",
                    password: "password123",
                  },
                  null,
                  2
                ),
              },
            },
            response: [
              {
                name: "Success Response",
                status: "OK",
                code: 200,
                body: {
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token
                },
              },
              {
                name: "Error Response - Invalid Credentials",
                status: "Unauthorized",
                code: 401,
                body: "Invalid credentials",
              },
              {
                name: "Error Response - Server Error",
                status: "Internal Server Error",
                code: 500,
                body: "Error logging in: [error message]",
              },
            ],
          },
        ],
      },
      {
        name: "Products",
        item: [
          {
            name: "Create Product",
            request: {
              auth: {
                type: "bearer",
                bearer: [
                  {
                    key: "token",
                    value: "{{jwtToken}}",
                    type: "string",
                  },
                ],
              },
              method: "POST",
              url: "https://car-management-backend-iwy1.onrender.com/products/create",
              description: "Create a new product (requires authentication)",
              header: [
                {
                  key: "Content-Type",
                  value: "application/json",
                },
                {
                  key: "Authorization",
                  value: "Bearer {{jwtToken}}",
                },
              ],
              body: {
                mode: "raw",
                raw: JSON.stringify(
                  {
                    title: "Sample Car",
                    description: "Detailed car description",
                    tags: ["luxury", "sedan", "automatic"],
                    imgUrl: [
                      "https://example.com/car1.jpg",
                      "https://example.com/car2.jpg",
                    ],
                  },
                  null,
                  2
                ),
              },
            },
          },
          {
            name: "Get All Products",
            request: {
              auth: {
                type: "bearer",
              },
              method: "GET",
              url: "https://car-management-backend-iwy1.onrender.com/products/get",
              description: "Retrieve all products (requires authentication)",
              header: [
                {
                  key: "Authorization",
                  value: "Bearer {{jwtToken}}",
                },
              ],
            },
          },
          {
            name: "Get Product by ID",
            request: {
              auth: {
                type: "bearer",
              },
              method: "GET",
              url: {
                raw: "https://car-management-backend-iwy1.onrender.com/products/get/:id",
                variable: [
                  {
                    key: "id",
                    value: "product_id_here",
                    description: "MongoDB ObjectId of the product",
                  },
                ],
              },
              header: [
                {
                  key: "Authorization",
                  value: "Bearer {{jwtToken}}",
                },
              ],
              description:
                "Retrieve a specific product by ID (requires authentication)",
            },
          },
          {
            name: "Update Product",
            request: {
              auth: {
                type: "bearer",
              },
              method: "PUT",
              url: {
                raw: "https://car-management-backend-iwy1.onrender.com/products/update/:id",
                variable: [
                  {
                    key: "id",
                    value: "product_id_here",
                    description: "MongoDB ObjectId of the product",
                  },
                ],
              },
              header: [
                {
                  key: "Content-Type",
                  value: "application/json",
                },
                {
                  key: "Authorization",
                  value: "Bearer {{jwtToken}}",
                },
              ],
              description:
                "Update a specific product (requires authentication)",
              body: {
                mode: "raw",
                raw: JSON.stringify(
                  {
                    title: "Updated Car Title",
                    description: "Updated car description",
                    tags: ["updated", "luxury", "automatic"],
                    imgUrl: [
                      "https://example.com/updated-car1.jpg",
                      "https://example.com/updated-car2.jpg",
                    ],
                  },
                  null,
                  2
                ),
              },
            },
          },
          {
            name: "Delete Product",
            request: {
              auth: {
                type: "bearer",
              },
              method: "DELETE",
              url: {
                raw: "https://car-management-backend-iwy1.onrender.com/products/delete/:id",
                variable: [
                  {
                    key: "id",
                    value: "product_id_here",
                    description: "MongoDB ObjectId of the product",
                  },
                ],
              },
              header: [
                {
                  key: "Authorization",
                  value: "Bearer {{jwtToken}}",
                },
              ],
              description:
                "Delete a specific product (requires authentication)",
            },
          },
          {
            name: "Search Products",
            request: {
              auth: {
                type: "bearer",
              },
              method: "GET",
              url: {
                raw: "https://car-management-backend-iwy1.onrender.com/products/search?q={{searchQuery}}",
                query: [
                  {
                    key: "q",
                    value: "{{searchQuery}}",
                    description: "Search query for products",
                  },
                ],
              },
              header: [
                {
                  key: "Authorization",
                  value: "Bearer {{jwtToken}}",
                },
              ],
              description: "Search products by query (requires authentication)",
            },
          },
        ],
      },
    ],
    variable: [
      {
        key: "jwtToken",
        value: "YOUR_JWT_TOKEN",
        type: "string",
      },
      {
        key: "searchQuery",
        value: "luxury",
        type: "string",
      },
    ],
  };

  res.json(collection);
});

export default router;

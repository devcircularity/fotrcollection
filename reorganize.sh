#!/bin/bash

# Define the base directory
BASE_DIR="./src/app"

# List of directories to create
DIRS=(
  "cart"
  "checkout"
  "login"
  "orders"
  "products"
  "profile"
  "search"
  "signup"
  "wishlist"
)

# Create the base directory if it doesn't exist
mkdir -p $BASE_DIR

# Create directories and the page.tsx file in each
for DIR in "${DIRS[@]}"; do
  mkdir -p "$BASE_DIR/$DIR"
  touch "$BASE_DIR/$DIR/page.tsx"
done

echo "Directory structure created successfully."


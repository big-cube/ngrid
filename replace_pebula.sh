#!/bin/bash

# Paths Replace Those Paths For Your Case (Copy the exact path not relative)
ANGULAR_DIR="/home/cihanemre/work/Q-Thor-Angular"
LIBRARY_SRC="/home/cihanemre/work/libraries/ngrid-bigcube/ngrid/dist/@pebula"
NODE_MODULES_DIR="$ANGULAR_DIR/node_modules"

# Paths to delete
ANGULAR_CACHE="$ANGULAR_DIR/.angular"
PEBULA_NODE_MODULES="$NODE_MODULES_DIR/@pebula"

# Remove the .angular directory
if [ -d "$ANGULAR_CACHE" ]; then
  echo "Removing $ANGULAR_CACHE..."
  rm -rf "$ANGULAR_CACHE"
else
  echo "$ANGULAR_CACHE does not exist, skipping... Replace The Paths For Your Case (Copy the exact path not relative)"
fi

# Remove the @pebula directory in node_modules
if [ -d "$PEBULA_NODE_MODULES" ]; then
  echo "Removing $PEBULA_NODE_MODULES..."
  rm -rf "$PEBULA_NODE_MODULES"
else
  echo "$PEBULA_NODE_MODULES does not exist, skipping... Replace The Paths For Your Case (Copy the exact path not relative)"
fi

# Copy the @pebula directory from the dist folder to node_modules
if [ -d "$LIBRARY_SRC" ]; then
  echo "Copying $LIBRARY_SRC to $NODE_MODULES_DIR..."
  cp -r "$LIBRARY_SRC" "$NODE_MODULES_DIR"
  echo "@pebula replaced successfully."
else
  echo "$LIBRARY_SRC does not exist. Ensure the source directory is correct. Replace The Paths For Your Case (Copy the exact path not relative)"
  exit 1
fi

echo "Operation completed."

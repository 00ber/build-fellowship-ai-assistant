#!/bin/sh

mkdir -p ./data

# Check if the Pokemon.csv doesn't exist (the extracted file)
if [ ! -f ./data/Pokemon.csv ]; then
    echo "Pokemon dataset not found. Downloading..."
    
    # Download if the zip doesn't exist
    if [ ! -f ./data/pokemon.zip ]; then
        curl -L -o ./data/pokemon.zip \
            https://www.kaggle.com/api/v1/datasets/download/abcsds/pokemon
        echo "Download complete."
    else
        echo "Zip file already exists, skipping download."
    fi
    
    # Extract the zip file
    echo "Extracting dataset..."
    cd data && unzip -o pokemon.zip && cd ..
    echo "Extraction complete."
else
    echo "Pokemon dataset already exists. Skipping download and extraction."
fi
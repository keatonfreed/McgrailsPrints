import re
import json


def parse_html_listings(file_path):
    # Use the provided working regex pattern
    pattern = re.compile(
        r'<div class="listing">.*?<a class="listing-card" href="//(.*?)">.*?url\(\'(.*?)\'\);.*?<span class="title">(.*?)</span>.*?<span class="price">(.*?)</span>', re.DOTALL)

    # Initialize a list to hold the parsed data
    parsed_data = []

    # Read the file and extract data
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            for match in pattern.finditer(content):
                parsed_data.append({
                    "etsy_url": "https://" + match.group(1).strip(),
                    "image_url": match.group(2).strip(),
                    "title": match.group(3).strip(),
                    "price": match.group(4).strip()
                })
    except FileNotFoundError:
        print(f"Error: The file {file_path} does not exist.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

    return parsed_data


def save_data_to_json(data, output_file):
    # Write data to a JSON file
    try:
        with open(output_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
        print(f"Data successfully saved to {output_file}")
    except Exception as e:
        print(f"Failed to save data to file: {str(e)}")


# Specify the path to the data.txt file and the output file
file_path = 'data.txt'
output_file = 'output.json'

# Parse the HTML listings and save the output to a file
listings = parse_html_listings(file_path)
save_data_to_json(listings, output_file)

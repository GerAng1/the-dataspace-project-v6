"""Modifies a given variable in a given JSON file.
ex. add_local_ip.py ALLOWED_HOSTS.json new_ip 192.168.362.12
Would modify the variable 'new_ip' with the value '192.168.362.12' within the file 'ALLOWED_HOSTS.json'.
"""
import argparse
import json

def load_config(config_file):
    with open(config_file, 'r') as file:
        return json.load(file)

def save_config(config_file, config_data):
    with open(config_file, 'w') as file:
        json.dump(config_data, file, indent=4)

def main():
    parser = argparse.ArgumentParser(description='Modify a variable in a configuration file.')
    parser.add_argument('config_file', type=str, help='Path to the configuration file')
    parser.add_argument('variable_name', type=str, help='Name of the variable to modify')
    parser.add_argument('new_value', type=str, help='New value for the variable')

    args = parser.parse_args()
    config_data = load_config(args.config_file)

    if args.variable_name in config_data:
        config_data[args.variable_name] = '["' + args.new_value + '",]'
        save_config(args.config_file, config_data)
        print(f"Updated {args.variable_name} to {args.new_value} in {args.config_file}")
    else:
        print(f"Variable {args.variable_name} not found in {args.config_file}")

if __name__ == "__main__":
    main()

#!/bin/bash

# Function to setup playground aliases, replacing existing ones

    local playground_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

setup_playground_aliases() {
    #  playground_dir: default to the apsoolute path of the directory containing this script
    local playground_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

    # Create playground directories if they don't exist
    mkdir -p "$playground_dir/javascript" \
             "$playground_dir/python" \
             "$playground_dir/vite-react-ts"

    # Temporary file to store modifications
    local temp_zshrc=$(mktemp)

    # Read the existing .zshrc
    if [ -f "$HOME/.zshrc" ]; then
        # Remove existing playground-related aliases and exports
        grep -v "export PLAYGROUND=" "$HOME/.zshrc" | \
        grep -v "alias js=" | \
        grep -v "alias py=" | \
        grep -v "alias react=" | \
        grep -v "alias new-js=" | \
        grep -v "alias new-py=" | \
        grep -v "alias new-react=" > "$temp_zshrc"
    fi

    # Add new configuration
    {
        echo "# Playground Configuration (auto-generated)"
        echo "export PLAYGROUND=\"$playground_dir\""
        echo
        echo "# Playground Aliases"
        echo "alias js=\"code \$PLAYGROUND/javascript\""
        echo "alias py=\"code \$PLAYGROUND/python\""
        echo "alias react=\"code \$PLAYGROUND/vite-react-ts\""
        echo "alias new-js=\"cp -r \$PLAYGROUND/javascript ./javascript-\$(date +%Y%m%d%H%M%S)\""
        echo "alias new-py=\"cp -r \$PLAYGROUND/python ./python-\$(date +%Y%m%d)\""
        echo "alias new-react=\"cp -r \$PLAYGROUND/vite-react-ts ./vite-react-ts-\$(date +%Y%m%d%H%M%S)\""
    } >> "$temp_zshrc"

    # Replace .zshrc with the new configuration
    mv "$temp_zshrc" "$HOME/.zshrc"

    echo "Playground aliases have been updated in .zshrc"
    echo "Playground directory set to: $playground_dir"
}

# Run the setup function
# Optionally pass a custom playground directory
setup_playground_aliases "$@"


# the flat '-v' in grep is used to invert the match, i.e. exclude lines that match the pattern
# $1 is the first argument passed to the script
# $@ is all arguments passed to the script
# mktemp creates a temporary file and returns its path
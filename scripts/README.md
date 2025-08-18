# Scripts

This directory contains utility scripts for the FortGuns Shop project.

## Fetch Global Infos

Fetches data from the global_infos WordPress API endpoint and saves it to a static JSON file.

### Usage

```bash
npm run fetch-global-infos
# or
pnpm fetch-global-infos
```

### Configuration

Before running the script, make sure to:

1. Set the `NEXT_PUBLIC_API_URL` environment variable to your WordPress API base URL
2. Or update the `BASE_URL` constant in the script file

### Output

The script will create a `public/data/global-infos.json` file containing the fetched data.

### Example Output Structure

```json
{
  "acf": {
    // Your ACF fields data here
  }
}
```

### Error Handling

The script includes comprehensive error handling for:

- Network timeouts
- API errors
- File system errors
- Invalid responses

Check the console output for detailed error information if the script fails.

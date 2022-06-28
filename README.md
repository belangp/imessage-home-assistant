# imessage-home-assistant
This Node.js script will monitor the iMessage chat database and forward any message coming from contacts in the allowed senders list to Home Assistant. 

# Installation

1. Download the repo
2. Create a config folder
3. In the config folder, create a default.yaml file
4. Run the script: npm install; node app.js

# Configuration file
---
    allowed_senders:
      - "number or email of the sender"
    
    home_assistant:
      host:  "URL or IP address of Home Assistant instance, including http:// or https://"
      port:  8123
      token: "A long-lived access token from Home Assistant"

# Allowed senders
Depending on the contact, you will either get their email or number from iMessage. You can run this script with no allowed senders. It will then print to the console any message that doesn't match senders in the list. You will be able to grab the correct number/email from there.

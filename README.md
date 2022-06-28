# imessage-home-assistant
This Node.js script will monitor the iMessage chat database and forward any message coming from contacts in the allowed senders list to Home Assistant. 

This app will call a script defined in the configuration, passing a sender and message arguments.

# Installation

1. Download the repo
2. Create a config folder
3. In the config folder, create a default.yaml file
4. Run the script: npm install; node app.js

# npm errors
npm install might return an error depending on which version of node you are using. If you get an error about sqlite3, this is likely related to npm not being able to find python. 

Look up the path for python: 
  run "which python3" or "which python2" depending on what version of python you are running

Run this command, replacing the last portion with the path to your python executable:
  npm install --build-from-source --python=/usr/bin/python3

# Configuration file
---
    allowed_senders:
      - "number or email of the sender"

    script: "entity ID of the script to call without the script. prefix"
    
    home_assistant:
      host:  "URL or IP address of Home Assistant instance, including http:// or https://"
      port:  8123
      token: "A long-lived access token from Home Assistant"

# Allowed senders
Depending on the contact, you will either get their email or number from iMessage. You can run this script with no allowed senders. It will then print to the console any message that doesn't match senders in the list. You will be able to grab the correct number/email from there.

# Running at startup
Edit the imessage-home-assistant.application.plist file and put the local directory of the project under the WorkingDirectory key

Copy that file to /Library/LaunchDaemons. This will require root/sudo privileges.

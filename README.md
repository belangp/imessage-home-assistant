# imessage-home-assistant
This Node.js script will monitor the iMessage chat database and forward any message coming from contacts in the allowed senders list to Home Assistant. 

This app will call a script defined in the configuration, passing a sender and message arguments.

# Installation

1. Download the repo
2. Create a config folder
3. In the config folder, create a default.yaml file
4. Give full disk access to Terminal: To do this, open system preferences, security & privacy and select the Privacy tab. Unlock the lock if needed. Scroll down the list and select Full Disk Access. In the applications list on the right-hand side, check the box next to Terminal. If the application doesn't show up, click the + button and add it.
5. Run the script: npm install; node app.js

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
    logging: [true|false] # Indicates if you want info messages to be outputted
    
    home_assistant:
      host:  "URL or IP address of Home Assistant instance, including http:// or https://"
      port:  8123
      token: "A long-lived access token from Home Assistant"

# Allowed senders
Depending on the contact, you will either get their email or number from iMessage. You can run this script with no allowed senders. It will then print to the console any message that doesn't match senders in the list. You will be able to grab the correct number/email from there.

# Running at startup
Install PM2 [https://pm2.keymetrics.io/]
npm install pm2 -g

Give full disk access to /bin/sh and /usr/local/lib/node_modules/pm2/bin/pm2. This is required so that the background process can access the chat database. To do this, open system preferences, security & privacy and select the Privacy tab. Unlock the lock if needed. Scroll down the list and select Full Disk Access. In Finder, select Go/Go to folder and enter /bin, then drag the sh command into the applications list. In Finder, select Go/Go to folder and enter /usr/local/lib/node_modules/pm2/bin then drag the pm2 command to the applications list. Ensure both are checked and lock the settings.

These next two operations will require sudo/root privileges
Generate startup script[https://pm2.keymetrics.io/docs/usage/startup/] based on your specific setup and put that script in /Library/LaunchDaemons. Note that this script will start all pm2 processes at startup.
Run launchctl load [full path to the generated script in /Library/LaunchDaemons]

cd into the app directory
run pm2 start app.js

Check for any errors in ~/.pm2/logs/app-error.log

If everything is good, reboot your machine.

Check if the process restarted properly with pm2 list

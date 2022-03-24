# Gitify
Scrape your own submissions from popular competitive programming site DMOJ and automatically insert the source code of correct submissions into a repository.

<br>

## v2 
Updated with a timeout such that users can log into account of their choice. This version also allows logging into external sites such as Google accounts through the use of a stealth library on puppeteer. 

<br>

## v1
Insert your username and password manually and run the program to see all the submissions become files. <br>
The brief process is as follows:
<ol>
  <li>Waits for browser to fully start</li>
  <li>Logs into your account autonomously</li>
  <li>Opens up your account's submission API</li>
  <li>Parses through the submissions with given constraints (often AC and in my case CPP11/PCPP11)</li>
  <li>Visit the raw data through the submission ID as a variable-passed URL and copy the raw data by parsing the data in between the body tags</li>
  <li>If the file is not found in the storage directory (prevent duplicates) don't add it</li>
  <li>Otherwise, continue to push back files</li>
  <li>After the process is complete, push all the files to a GitHub repo</li>
</ol>

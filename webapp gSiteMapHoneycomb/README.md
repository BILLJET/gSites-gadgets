# gSiteMapHoneycomb - SVG d3 Site Map

About
-----
This script creates honeycomb like site map with hyperlinks to defined pages. In config file you can change hyperlinks and names which are shown on page. This app script is prepared for google sites.

Environement setup
------------------
To add this script to page you need google account. You must add this code to script and publish app next. 
Last step is to insert apps script to google site page.

Change default spread sheet
-------------------------------------------
Open file Main.gs. In first line you have 
var sheetId = "1I38CMuP4Axk-tGBvpRUy28NKE-pBfwRuBihE4orCvqg";
Change value of variable sheetId with your config sheet ID.

Config sheet must have 2 columns named: Name, Url
Name of the sheet must be url of the page on which gSiteMapHoneycomb shoudl appear.

Example config file:
https://docs.google.com/spreadsheets/d/1I38CMuP4Axk-tGBvpRUy28NKE-pBfwRuBihE4orCvqg/edit#gid=0 

For more information, see: 
https://developers.google.com/apps-script/overview

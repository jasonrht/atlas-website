## Sales Agency Employee Portal
My roommate works at a sales agency and they store their data with a third party database that also handles the data for other companies alike. The data on the website of the third party was not always 100% accurate, so my roommate asked me if I could scrape their website for him to get the data and clean it. I fixed this for him in about a week. I wrote a web scraping Python script that automatically scrapes and processes the data and inserts that data into a Google Spreadsheet. This saved my roommate at least 6 hours a week of manually copying data from webpages to a worksheet.

The sales agency that I did this project for does door-to-door sales. In this line of work you need an ID which says what project you are working for. These ID's have to be manually requested via email at a third party. I created a page on the employee portal where an employee of the sales agency can request a new ID on his own. So in essence, the employee fills in a form on the employee portal and an email is sent automatically, ordering a new ID.

Find the backend source code at:
https://github.com/jasonrht/atlas-server

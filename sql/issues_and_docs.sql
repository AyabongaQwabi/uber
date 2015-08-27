SELECT type, url from documents where driver_id = 1;
SELECT name, status from issues where driver_id = 1;

SELECT documents.type, documents.url, issues.issue,issues.status FROM  documents, issues WHERE documents.driver_id = driver.id;
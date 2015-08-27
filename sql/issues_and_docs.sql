SELECT type, url from documents where driver_id = 1;
SELECT driver.name,documents.type, documents.url from driver,documents where driver.id = 1;



SELECT issues.issue, issues.status, driver.name,documents.type,documents.url 
FROM driver,issues,documents
WHERE issues.driver_id = driver.id
AND documents.driver_id = driver.id;
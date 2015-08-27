
SELECT driver.name,issues.issue,issues.status, documents.type,documents.url 
FROM driver,issues,documents
WHERE issues.driver_id = driver.id
AND documents.driver_id = driver.id;
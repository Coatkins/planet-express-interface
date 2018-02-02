-- Up
ALTER TABLE Orders ADD COLUMN DeliveryStatus TEXT;
ALTER TABLE Orders ADD COLUMN CollectionDate TEXT; 

CREATE TABLE Users (
	id INTEGER PRIMARY KEY,
	Username TEXT,
	Email TEXT,
	Password TEXT,
	ResetToken TEXT
);

-- Down
ALTER TABLE Orders
	DROP COLUMN DeliveryStatus,
	DROP COLUMN CollectionDate;
DROP TABLE Users;
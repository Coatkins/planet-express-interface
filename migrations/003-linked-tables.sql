-- Up
ALTER TABLE Orders ADD COLUMN UserID INTEGER;

-- Down
ALTER TABLE Orders
	DROP COLUMN UserID;
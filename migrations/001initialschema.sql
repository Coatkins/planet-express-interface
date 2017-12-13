-- Up
CREATE TABLE Orders (
	id INTEGER PRIMARY KEY, 
	Title TEXT,
	Forename TEXT,
	Surname TEXT,
	PersonalAdd1 TEXT,
	PersonalAdd2 TEXT,
	PersonalPostcode TEXT,
	Phonenumber TEXT,
	Email TEXT,
	Weight TEXT,
	Comments TEXT,
	CollectionAdd1 TEXT,
	CollectionAdd2 TEXT,
	CollectionPostcode TEXT,
	DeliveryAdd1 TEXT,
	DeliveryAdd2 TEXT,
	DeliveryPostcode TEXT
);

-- Down
DROP TABLE Category
DROP TABLE Post;
-- מחיקת מסד נתונים קיים במידה וקיים
DROP DATABASE IF EXISTS DarcheiMiriamDB;

-- יצירת מסד נתונים חדש
CREATE DATABASE DarcheiMiriamDB;

-- שימוש במסד הנתונים שנוצר
USE DarcheiMiriamDB;

-- טבלת סיסמאות
CREATE TABLE PasswordTable (
    PasswordId INT AUTO_INCREMENT PRIMARY KEY,
    PasswordValue VARCHAR(255) NOT NULL
);

-- טבלת כתובות
CREATE TABLE AddressTable (
    AddressId INT AUTO_INCREMENT PRIMARY KEY,
    City VARCHAR(50) NOT NULL,
    Neighborhood VARCHAR(50),
    Street VARCHAR(100) NOT NULL,
    HouseNumber VARCHAR(10) NOT NULL,
    ZipCode VARCHAR(10)
);

-- טבלת חולים
CREATE TABLE PatientTable (
    PatientId INT PRIMARY KEY,
    PasswordId INT NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    AddressId INT NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    Mail VARCHAR(100) NOT NULL,
    FOREIGN KEY (PasswordId) REFERENCES PasswordTable(PasswordId),
    FOREIGN KEY (AddressId) REFERENCES AddressTable(AddressId)
);

-- טבלת מתנדבים
CREATE TABLE VolunteerTable (
    VolunteerId INT PRIMARY KEY,
    PasswordId INT NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    AddressId INT NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    Mail VARCHAR(100) NOT NULL,
    Location VARCHAR(100),
    CommunicationMethod VARCHAR(50),
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    BirthDate DATE NOT NULL,
    FOREIGN KEY (PasswordId) REFERENCES PasswordTable(PasswordId),
    FOREIGN KEY (AddressId) REFERENCES AddressTable(AddressId)
);

-- טבלת מרכזים רפואיים
CREATE TABLE MedicalCenterTable (
    MedicalCenterId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    AddressId INT NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    ContactPerson VARCHAR(100),
    FOREIGN KEY (AddressId) REFERENCES AddressTable(AddressId)
);

-- טבלת בקשות נסיעה
CREATE TABLE TravelRequestTable (
    TravelRequestId INT AUTO_INCREMENT PRIMARY KEY,
    PatientId INT NOT NULL,
    Origin VARCHAR(100) NOT NULL,
    TravelTime TIME NOT NULL,
    TravelDate DATE NOT NULL,
    Destination VARCHAR(100) NOT NULL,
    NumberOfPassengers INT NOT NULL,
    IsAlone BOOLEAN NOT NULL,
    Frequency VARCHAR(50),
    Status ENUM('התקבלה', 'נלקחה', 'הושלמה', 'תשלום') NOT NULL,
    FOREIGN KEY (PatientId) REFERENCES PatientTable(PatientId)
);

-- טבלת התאמת נסיעה
CREATE TABLE TravelMatchTable (
    TravelMatchId INT AUTO_INCREMENT PRIMARY KEY,
    TravelRequestId INT NOT NULL,
    VolunteerId INT NOT NULL,
    MatchTime TIME NOT NULL,
    MatchDate DATE NOT NULL,
    NumberOfPassengers INT NOT NULL,
    FOREIGN KEY (TravelRequestId) REFERENCES TravelRequestTable(TravelRequestId),
    FOREIGN KEY (VolunteerId) REFERENCES VolunteerTable(VolunteerId)
);

-- טבלת העברת ציוד
CREATE TABLE EquipmentTransferTable (
    EquipmentTransferId INT AUTO_INCREMENT PRIMARY KEY,
    Origin VARCHAR(100) NOT NULL,
    Destination VARCHAR(100) NOT NULL,
    TransferDate DATE NOT NULL,
    TransferTime TIME NOT NULL
);

-- הכנסת נתונים לדוגמה בטבלת סיסמאות
INSERT INTO PasswordTable (PasswordValue) VALUES 
('password123'),
('securepass456'),
('mysecret789');

-- הכנסת נתונים לדוגמה בטבלת כתובות
INSERT INTO AddressTable (City, Neighborhood, Street, HouseNumber, ZipCode) VALUES 
('Jerusalem', 'Rehavia', 'Herzl', '15', '91000'),
('Tel Aviv', 'Neve Tzedek', 'Shabazi', '25', '65100'),
('Haifa', 'Carmel', 'Hanasi', '5', '34980');

-- הכנסת נתונים לדוגמה בטבלת חולים
INSERT INTO PatientTable (PatientId, PasswordId, Name, AddressId, Phone, Mail) VALUES 
(123456789, 1, 'David Cohen', 1, '050-1234567', 'david@example.com'),
(234567890, 2, 'Sarah Levi', 2, '050-2345678', 'sarah@example.com'),
(345678901, 3, 'Yosef Mor', 3, '050-3456789', 'yosef@example.com');

-- הכנסת נתונים לדוגמה בטבלת מתנדבים
INSERT INTO VolunteerTable (VolunteerId, PasswordId, Name, AddressId, Phone, Mail, Location, CommunicationMethod, Gender, BirthDate) VALUES 
(987654321, 1, 'Rachel Green', 1, '050-9876543', 'rachel@example.com', 'Jerusalem', 'Phone', 'Female', '1990-05-15'),
(876543210, 2, 'Monica Geller', 2, '050-8765432', 'monica@example.com', 'Tel Aviv', 'Email', 'Female', '1985-08-22'),
(765432109, 3, 'Ross Geller', 3, '050-7654321', 'ross@example.com', 'Haifa', 'WhatsApp', 'Male', '1987-10-18');

-- הכנסת נתונים לדוגמה בטבלת מרכזים רפואיים
INSERT INTO MedicalCenterTable (Name, AddressId, Phone, ContactPerson) VALUES 
('Hadassah Medical Center', 1, '02-1234567', 'Dr. Alice'),
('Sourasky Medical Center', 2, '03-2345678', 'Dr. Bob'),
('Rambam Health Care Campus', 3, '04-3456789', 'Dr. Charlie');

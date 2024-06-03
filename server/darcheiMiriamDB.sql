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

-- טבלת תפקידים
CREATE TABLE RoleTable (
    RoleId INT AUTO_INCREMENT PRIMARY KEY,
    RoleName ENUM('Patient', 'Volunteer', 'Admin') NOT NULL
);

-- טבלת משתמשים
CREATE TABLE UserTable (
    UserId INT PRIMARY KEY,
    PasswordId INT NOT NULL UNIQUE,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    AddressId INT NOT NULL UNIQUE,
    Phone VARCHAR(15) NOT NULL,
    Mail VARCHAR(100) NOT NULL,
    RoleId INT NOT NULL,
    FOREIGN KEY (PasswordId) REFERENCES PasswordTable(PasswordId),
    FOREIGN KEY (AddressId) REFERENCES AddressTable(AddressId),
    FOREIGN KEY (RoleId) REFERENCES RoleTable(RoleId)
);

-- טבלת חולים
CREATE TABLE PatientTable (
    PatientId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES UserTable(UserId)
);

-- טבלת מתנדבים
CREATE TABLE VolunteerTable (
    VolunteerId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    Location VARCHAR(100),
    CommunicationMethod VARCHAR(50),
    Gender ENUM('Male', 'Female') NOT NULL,
    BirthDate DATE NOT NULL,
    FOREIGN KEY (UserId) REFERENCES UserTable(UserId)
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
('mysecret789'),
('uniquePwd001'),
('uniquePwd002'),
('uniquePwd003');

-- הכנסת נתונים לדוגמה בטבלת כתובות
INSERT INTO AddressTable (City, Neighborhood, Street, HouseNumber, ZipCode) VALUES 
('Jerusalem', 'Rehavia', 'Herzl', '15', '91000'),
('Tel Aviv', 'Neve Tzedek', 'Shabazi', '25', '65100'),
('Haifa', 'Carmel', 'Hanasi', '5', '34980'),
('Eilat', 'Shaham', 'Derech Yotam', '3', '88000'),
('Beersheba', 'Ramot', 'Rager Blvd', '12', '84100'),
('Rishon LeZion', 'HaHadarom', 'Rothschild', '4', '75200');

-- הכנסת נתונים לדוגמה בטבלת תפקידים
INSERT INTO RoleTable (RoleName) VALUES 
('Patient'),
('Volunteer'),
('Admin');

-- הכנסת נתונים לדוגמה בטבלת משתמשים
INSERT INTO UserTable (UserId, PasswordId, FirstName, LastName, AddressId, Phone, Mail, RoleId) VALUES 
(123456789, 1, 'David', 'Cohen', 1, '050-1234567', 'david@example.com', 1),
(234567890, 2, 'Sarah', 'Levi', 2, '050-2345678', 'sarah@example.com', 1),
(345678901, 3, 'Yosef', 'Mor', 3, '050-3456789', 'yosef@example.com', 1),
(987654321, 4, 'Rachel', 'Green', 4, '050-9876543', 'rachel@example.com', 2),
(876543210, 5, 'Monica', 'Geller', 5, '050-8765432', 'monica@example.com', 2),
(765432109, 6, 'Ross', 'Geller', 6, '050-7654321', 'ross@example.com', 2);

-- הכנסת נתונים לדוגמה בטבלת חולים
INSERT INTO PatientTable (UserId) VALUES 
(123456789),
(234567890),
(345678901);

-- הכנסת נתונים לדוגמה בטבלת מתנדבים
INSERT INTO VolunteerTable (UserId, Location, CommunicationMethod, Gender, BirthDate) VALUES 
(987654321, 'Jerusalem', 'Phone', 'Female', '1990-05-15'),
(876543210, 'Tel Aviv', 'Email', 'Female', '1985-08-22'),
(765432109, 'Haifa', 'WhatsApp', 'Male', '1987-10-18');

-- הכנסת נתונים לדוגמה בטבלת מרכזים רפואיים
INSERT INTO MedicalCenterTable (Name, AddressId, Phone, ContactPerson) VALUES 
('Hadassah Medical Center', 1, '02-1234567', 'Dr. Alice'),
('Sourasky Medical Center', 2, '03-2345678', 'Dr. Bob'),
('Rambam Health Care Campus', 3, '04-3456789', 'Dr. Charlie');

-- הכנסת נתונים לדוגמה לטבלת בקשות נסיעה
INSERT INTO TravelRequestTable (PatientId, Origin, TravelTime, TravelDate, Destination, NumberOfPassengers, IsAlone, Frequency, Status) VALUES 
(1, 'Jerusalem', '10:00:00', '2024-06-01', 'Hadassah Medical Center', 1, TRUE, 'Weekly', 'נלקחה'),
(2, 'Tel Aviv', '14:00:00', '2024-06-05', 'Sourasky Medical Center', 1, FALSE, 'Monthly', 'נלקחה'),
(3, 'Haifa', '09:30:00', '2024-06-10', 'Rambam Health Care Campus', 2, TRUE, 'One-time', 'הושלמה');

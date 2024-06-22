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
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    PasswordId INT NOT NULL UNIQUE,
    FirstName VARCHAR(100) NULL,
    LastName VARCHAR(100) NULL,
    AddressId INT NULL,
    Phone VARCHAR(15) NULL,
    Mail VARCHAR(100) NOT NULL,
    Gender ENUM('Male', 'Female') NULL,
    BirthDate DATE NULL,
    CommunicationMethod VARCHAR(50),
    IsApproved BOOLEAN NOT NULL DEFAULT FALSE,
    RoleId INT NULL,
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
    Status ENUM('התקבלה', 'נלקחה', 'הושלמה', 'תשלום') NOT NULL,
    Recurring BOOLEAN DEFAULT FALSE,
    RecurringDays VARCHAR(50),
    RecurringEndDate DATE,
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

CREATE TABLE RefreshTokenTable (
    RefreshTokenId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    RefreshToken VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserId) REFERENCES UserTable(UserId)
);

-- הכנסת נתונים לדוגמה בטבלת סיסמאות
INSERT INTO PasswordTable (PasswordValue) VALUES
('$2a$10$a.NYmglhT9kjxB3OexMbr.nLO1ZKwFZCDimaTB32JCK8LTn1boVWW'),
('$2a$10$3PvNVK7qPLQ7SL2wkydD5unQ4t6SbPTcKQg.5YxE89M2c8J1H91eu'),
('$2a$10$Z1JyeOu8z3.yfho4B2o0fO23bxmdQBrx0lxhulJNk/0hIp8JFehk2'),
('$2a$10$oaB4yNjugjdbGsoJEMBO2uSRy2HjLZ726I7RMa2RDUm0.5XD0/AKm'),
('$2a$10$Q/bc/UJUwXUBXpMuTgNWc.dS1R8AHdGJvVTm9CU.GmroTRsVPI1ka'),
('$2a$10$nZUXNH7haJZFjAlMc7OPguZ446b519jBxwYe.MMwBKJmqXzkqF7Y2');

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
INSERT INTO UserTable (PasswordId, FirstName, LastName, AddressId, Phone, Mail,Gender,BirthDate,CommunicationMethod,RoleId, IsApproved) VALUES
(1, 'David', 'Cohen', 1, '050-1234567', 'david@example.com','Male','2024-05-30', 'Phone', 1, FALSE),
(2, 'Sarah', 'Levi', 2, '050-2345678', 'sarah@example.com','Female','2024-05-30', 'Email', 1, FALSE),
(3, 'Yosef', 'Mor', 3, '050-3456789', 'yosef@example.com','Male','2024-05-30', 'Email', 1, FALSE),
(4, 'Rachel', 'Green', 4, '050-9876543', 'rachel@example.com','Female','2024-05-30', 'Phone', 2, FALSE),
(5, 'Monica', 'Geller', 5, '050-8765432', 'monica@example.com','Female','2024-05-30', 'WhatsApp', 2, FALSE),
(6, 'Ross', 'Geller', 6, '050-7654321', 'ross@example.com','Female','2024-05-30', 'WhatsApp', 2, FALSE);

-- הכנסת נתונים לדוגמה בטבלת חולים
INSERT INTO PatientTable (UserId) VALUES
(1),
(2),
(3);

-- הכנסת נתונים לדוגמה בטבלת מתנדבים
INSERT INTO VolunteerTable (UserId, Location) VALUES
(4, 'Jerusalem'),
(5, 'Tel Aviv'),
(6, 'Haifa');

-- הכנסת נתונים לדוגמה בטבלת מרכזים רפואיים
INSERT INTO MedicalCenterTable (Name, AddressId, Phone, ContactPerson) VALUES
('Hadassah Medical Center', 1, '02-1234567', 'Dr. Alice'),
('Sourasky Medical Center', 2, '03-2345678', 'Dr. Bob'),
('Rambam Health Care Campus', 3, '04-3456789', 'Dr. Charlie');

-- הכנסת נתונים לדוגמה לטבלת בקשות נסיעה
INSERT INTO TravelRequestTable (PatientId, Origin, TravelTime, TravelDate, Destination, NumberOfPassengers, IsAlone, Status, Recurring, RecurringDays, RecurringEndDate) VALUES 
(1, 'Jerusalem', '10:00:00', CURDATE(), 'Hadassah Medical Center', 1, TRUE, 'התקבלה', TRUE, 'ראשון,שלישי,שבת', '2024-12-31'),
(2, 'Tel Aviv', '14:00:00', '2024-06-05', 'Sourasky Medical Center', 1, FALSE, 'התקבלה', TRUE, 'שני,שישי', '2024-12-31'),
(3, 'Haifa', '09:30:00', '2024-06-10', 'Rambam Health Care Campus', 2, TRUE, 'הושלמה', FALSE, NULL, NULL);

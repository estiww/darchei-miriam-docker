DROP DATABASE IF EXISTS DarcheiMiriamDB;

CREATE DATABASE DarcheiMiriamDB;

USE DarcheiMiriamDB;

CREATE TABLE
    PasswordTable (
        PasswordId INT AUTO_INCREMENT PRIMARY KEY,
        PasswordValue VARCHAR(255) NOT NULL
    );

CREATE TABLE
    AddressTable (
        AddressId INT AUTO_INCREMENT PRIMARY KEY,
        City VARCHAR(50) NOT NULL,
        Neighborhood VARCHAR(50),
        Street VARCHAR(100) NOT NULL,
        HouseNumber VARCHAR(10) NOT NULL,
        ZipCode VARCHAR(10)
    );

CREATE TABLE
    RoleTable (
        RoleId INT AUTO_INCREMENT PRIMARY KEY,
        RoleName ENUM('Patient', 'Volunteer', 'Admin', 'Driver') NOT NULL
    );

CREATE TABLE
    UserTable (
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
        resetPasswordToken VARCHAR(255),
        resetPasswordExpires DATETIME,
        FOREIGN KEY (PasswordId) REFERENCES PasswordTable (PasswordId),
        FOREIGN KEY (AddressId) REFERENCES AddressTable (AddressId),
        FOREIGN KEY (RoleId) REFERENCES RoleTable (RoleId)
    );

CREATE TABLE
    PatientTable (
        PatientId INT AUTO_INCREMENT PRIMARY KEY,
        UserId INT NOT NULL,
        FOREIGN KEY (UserId) REFERENCES UserTable (UserId)
    );

CREATE TABLE
    VolunteerTable (
        VolunteerId INT AUTO_INCREMENT PRIMARY KEY,
        UserId INT NOT NULL,
        Location VARCHAR(100),
        FOREIGN KEY (UserId) REFERENCES UserTable (UserId)
    );

CREATE TABLE
    MedicalCenterTable (
        MedicalCenterId INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        AddressId INT NOT NULL,
        Phone VARCHAR(15) NOT NULL,
        ContactPerson VARCHAR(100),
        FOREIGN KEY (AddressId) REFERENCES AddressTable (AddressId)
    );

CREATE TABLE
    TravelRequestTable (
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
        FOREIGN KEY (PatientId) REFERENCES PatientTable (PatientId)
    );

CREATE TABLE
    TravelMatchTable (
        TravelMatchId INT AUTO_INCREMENT PRIMARY KEY,
        TravelRequestId INT NOT NULL,
        VolunteerId INT NOT NULL,
        MatchTime TIME NOT NULL,
        MatchDate DATE NOT NULL,
        NumberOfPassengers INT NOT NULL,
        FOREIGN KEY (TravelRequestId) REFERENCES TravelRequestTable (TravelRequestId),
        FOREIGN KEY (VolunteerId) REFERENCES VolunteerTable (VolunteerId)
    );

CREATE TABLE
    EquipmentTransferTable (
        EquipmentTransferId INT AUTO_INCREMENT PRIMARY KEY,
        Origin VARCHAR(100) NOT NULL,
        Destination VARCHAR(100) NOT NULL,
        TransferDate DATE NOT NULL,
        TransferTime TIME NOT NULL
    );

CREATE TABLE
    RefreshTokenTable (
        RefreshTokenId INT AUTO_INCREMENT PRIMARY KEY,
        UserId INT NOT NULL,
        RefreshToken VARCHAR(255) NOT NULL,
        FOREIGN KEY (UserId) REFERENCES UserTable (UserId)
    );
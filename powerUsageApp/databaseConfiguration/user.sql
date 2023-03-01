create database powerUsageDb;
use powerUsageDb;
create TABLE users (
    userId int primary key auto_increment,
    displayName varchar(40),
    userName varchar(60) not null unique,
    emailId varchar(60) not null unique,
    mobileNumber varchar(10) not null unique,
    password varchar(50) not null
);
create TABLE powerUsage (
    powerUsageId int primary key auto_increment,
    fromTime datetime,
    toTime datetime,
    duration int,
    unitsConsumed int,
    applianceType varchar(10),
    userId int not null,
    foreign key (userId) references users(userId)
);
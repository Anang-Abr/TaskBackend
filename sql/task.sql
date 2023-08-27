create table task(
    id int auto_increment primary key not null,
    items varchar(255),
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

create table users(
    id int auto_increment primary key not null,
    username varchar(255) not null,
    password varchar(255) not null,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);
drop table if exists task; 
drop table if exists account 

create table task (
    id serial primary key,
    description varchar(255) not null
);

insert into task (description) values ('My test task');
insert into task (description) values ('My another test task');

create table account (
    id serial primary key,
    email varchar(255) unique  not null,
    password varchar(255) not null
);

create table employees(

        id serial primary key,
        name varchar(255) not null,
        surname varchar(255) not null,
        project_number varchar(255) not null
);
create table projects (

        id serial primary key,
        name varchar(255) not null,
        description text ,
        status varchar(20) not null

);





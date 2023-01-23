CREATE DATABASE hostelwebsite;

CREATE TABLE hostelites(
    h_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    h_name VARCHAR(255) NOT NULL,
    h_email VARCHAR(255) NOT NULL,
    h_password VARCHAR(255) NOT NULL
);

INSERT INTO hostelites(h_name,h_email,h_password) VALUES ('Asmita','araina_b21@it.vjti.ac.in','ashsap123');



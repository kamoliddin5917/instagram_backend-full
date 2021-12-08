CREATE DATABASE instagram;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE userstatus AS ENUM ('active','!active');
CREATE TYPE poststatus AS ENUM ('active','!active');
CREATE TYPE commentstatus AS ENUM ('active','!active');

CREATE TABLE users(
    user_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    user_firstname varchar(30) not null,
    user_lastname varchar(50) not null,
    user_email varchar(70) unique not null,
    user_password text not null,
    user_image text default 'https://via.placeholder.com/200x200',
    user_date timestamp with time zone not null default current_timestamp,
    user_status userstatus not null default 'active' 
);
CREATE TABLE posts(
    post_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    post_date timestamp with time zone not null default current_timestamp,
    post_status poststatus not null default 'active',
    post_name varchar(200) not null,
    post_media text [] not null,
    post_author uuid not null,
    CONSTRAINT fk_post_author
        FOREIGN KEY(post_author)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);
CREATE TABLE comments(
    comment_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    comment_date timestamp with time zone not null default current_timestamp,
    comment_status commentstatus not null default 'active',
    comment_name varchar(500) not null,
    comment_post uuid not null,
    CONSTRAINT fk_comment_post
        FOREIGN KEY(comment_post)
            REFERENCES posts(post_id)
            ON DELETE CASCADE,
    comment_author uuid not null,
    CONSTRAINT fk_comment_author
        FOREIGN KEY(comment_author)
            REFERENCES users(user_id)
            ON DELETE CASCADE,
    comment_ref_id uuid default null,
    CONSTRAINT fk_comment_comment
        FOREIGN KEY(comment_ref_id)
            REFERENCES comments(comment_id)
            ON DELETE CASCADE
);
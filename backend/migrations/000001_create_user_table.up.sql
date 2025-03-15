create table users (
    id varchar(27) primary key,
    email varchar(255) not null unique,
    password bytea not null,
    created_at timestamp not null default now()
);

create table videos (
    id varchar(27) primary key,
    uploader_id varchar(27) not null references users(id) on delete cascade,
    is_upload_complete boolean not null,
    title varchar(255) not null,
    visibility varchar(30) not null,
    description text not null,
    created_at timestamp not null default now()
);


create database simplesabrescorecard_db;

use simplesabrescorecard_db;
create table users (
    id bigint auto_increment primary key,
    username varchar(255) not null unique,
    password varchar(255) not null
);

create table counting_statistics (
    id bigint auto_increment primary key,
    user_id bigint not null,
    hits int,
    at_bats int,
    sacrifice_flies int,
    total_bases int,
    plate_appearances int,
    walks int,
    hit_by_pitch int,
    strikeouts int, 
    innings_pitched double,
    earned_runs_allowed int,
    hits_allowed int,
    def_sacrificies int,
    def_sacrifice_flies int,
    errors int,
    league_average_era double,
    putouts int,
    assists int,
    batters_faced int,
    walks_allowed int,
    catchers_interference int,
    foreign key (user_id) references users(id) on delete cascade
);

create table offensive_sabermetrics (
    id bigint auto_increment primary key,
    user_id bigint not null,
    batting_average double,
    on_base_percentage double,
    slugging_percentage double,
    on_base_plus_slugging double,
    walk_percentage double,
    strikeout_percentage double,
    created_at timestamp not null default current_timestamp,
    foreign key (user_id) references users(id) on delete cascade
);

create table defensive_sabermetrics (
    id bigint auto_increment primary key,
    user_id bigint not null,
    fielding_percentage double,
    walk_hits_innings_pitched double,
    opposing_batting_average double,
    earned_run_average double,
    earned_run_average_plus double,
    created_at timestamp not null default current_timestamp,
    foreign key (user_id) references users(id) on delete cascade
);

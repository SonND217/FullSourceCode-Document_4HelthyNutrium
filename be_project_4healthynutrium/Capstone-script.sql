use `4healthynutrium`;

create table `Role`(
id int NOT NULL AUTO_INCREMENT primary key,
role_name nvarchar(255) NOT NULL
);

create table `Meal`(
id int NOT NULL AUTO_INCREMENT primary key,
meal_name nvarchar(255) NOT NULL
);

create table `Season`(
id int NOT NULL AUTO_INCREMENT primary key,
season_name nvarchar(255) NOT NULL
);

create table `Category`(
id int NOT NULL AUTO_INCREMENT primary key,
category_name nvarchar(255) NOT NULL,
category_status bool NOT NULL
);

create table `User`(
id int NOT NULL AUTO_INCREMENT primary key,
email nvarchar(255) NOT NULL,
name nvarchar(255) NOT NULL,
password nvarchar(255) NOT NULL,
phone nvarchar(255) NOT NULL,
address nvarchar(255) NOT NULL,
dob date NOT NULL,
gender bit NOT NULL,
status bit NOT NULL,
role_id int NOT NULL,
CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
);

-- create table `Exercise`(
--  id int AUTO_INCREMENT primary key,
--  exercise_name nvarchar(255) NOT NULL,
--  user_id int NOT NULL,
--  CONSTRAINT `fk_exercise_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
-- );

create table `Food`(
id int NOT NULL AUTO_INCREMENT primary key,
food_name nvarchar(255) NOT NULL,
category_id int NOT NULL,
img varchar(100) NOT NULL,
recipe nvarchar(10000) NOT NULL,
fat float NOT NULL,
protein float NOT NULL,
carb float NOT NULL,
calo float NOT NULL,
status bool NOT NULL,
CONSTRAINT `fk_food_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);

create table `Ingredient`(
id int NOT NULL AUTO_INCREMENT primary key,
ingredient_name nvarchar(255) NOT NULL,
img varchar(100) NOT NULL,
min_limit int NOT NULL,
max_limit int NOT NULL,
calo float NOT NULL,
fat float NOT NULL,
protein float NOT NULL,
carb float NOT NULL,
water float NOT NULL,
fiber float NOT NULL,
ash float NOT NULL,
canxi float NOT NULL,
iron float NOT NULL,
zinc float NOT NULL,
vitaminC float NOT NULL,
vitaminB1 float NOT NULL,
vitaminB2 float NOT NULL,
vitaminB3 float NOT NULL,
vitaminB6A float NOT NULL,
vitaminD float NOT NULL,
vitaminB12 float NOT NULL,
vitaminA float NOT NULL,
vitaminA_rae float NOT NULL,
status bool NOT NULL
);

create table `TabooFood`(
id int NOT NULL AUTO_INCREMENT primary key, 
ingredient1_id int NOT NULL,
ingredient2_id int NOT NULL,
description nvarchar(10000) NOT NULL,
CONSTRAINT `fk_taboo_ingredient1` FOREIGN KEY (`ingredient1_id`) REFERENCES `ingredient` (`id`),
CONSTRAINT `fk_taboo_ingredient2` FOREIGN KEY (`ingredient2_id`) REFERENCES `ingredient` (`id`)
);

create table `Food_Meal`(
id int NOT NULL AUTO_INCREMENT primary key, 
food_id int NOT NULL,
meal_id int NOT NULL,
CONSTRAINT `fk_foodMeal_food` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
CONSTRAINT `fk_foodMeal_meal` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`)
);

create table `FoodDetail`(
id int NOT NULL AUTO_INCREMENT primary key, 
food_id int NOT NULL,
ingredient_id int NOT NULL,
mass float NOT NULL,
CONSTRAINT `fk_foodDetail_food` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
CONSTRAINT `fk_foodDetail_ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`)
);

-- create table `PersonDiet`(
-- id int NOT NULL AUTO_INCREMENT primary key, 
-- meal_id int NOT NULL,
-- food_id int NOT NULL,
-- date_create datetime NOT NULL,
-- CONSTRAINT `fk_sampleDiet_meal` FOREIGN KEY (`meal_id`) REFERENCES `food` (`id`),
-- CONSTRAINT `fk_sampleDiet_food` FOREIGN KEY (`food_id`) REFERENCES `meal` (`id`)
-- );

create table `Season_Food`(
id int NOT NULL AUTO_INCREMENT primary key, 
food_id int NOT NULL,
season_id int NOT NULL,
CONSTRAINT `fk_seasonfood_food` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
CONSTRAINT `fk_seasonfood_season` FOREIGN KEY (`season_id`) REFERENCES `season` (`id`)
);

create table `Season_Ingredient`(
id int NOT NULL AUTO_INCREMENT primary key, 
ingredient_id int NOT NULL,
season_id int NOT NULL,
CONSTRAINT `fk_seasoningredient_ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`),
CONSTRAINT `fk_seasoningredient_season` FOREIGN KEY (`season_id`) REFERENCES `season` (`id`)
);

create table `Recommendation`(
id int NOT NULL AUTO_INCREMENT primary key,
age_min int NOT NULL,
age_max int NOT NULL,
gender bool NOT NULL, 
iot float NOT NULL,
vitaminA float NOT NULL,
vitaminD float NOT NULL,
vitaminC float NOT NULL,
vitaminE float NOT NULL,
vitaminK float NOT NULL,
vitaminB1 float NOT NULL,
vitaminB2 float NOT NULL,
vitaminB3 float NOT NULL,
vitaminB6 float NOT NULL,
vitaminB9 float NOT NULL,
vitaminB12 float NOT NULL,
zinc float NOT NULL,
magie float NOT NULL,
photpho float NOT NULL,
iron float NOT NULL,
canxi float NOT NULL
);

create table `CoefficientMotion`(
id int NOT NULL AUTO_INCREMENT primary key, 
age_min int NOT NULL,
age_max int NOT NULL,
coefficient_motion float NOT NULL,
gender bool NOT NULL,
description nvarchar(255) NOT NULL
);

-- create table `CoefficientMotion`(
-- id int NOT NULL AUTO_INCREMENT primary key, 
-- job_id int NOT NULL,
-- age_min int NOT NULL,
-- age_max int NOT NULL,
-- coefficient_motion float NOT NULL,
-- gender bool NOT NULL,
-- description nvarchar(255) NOT NULL,
-- CONSTRAINT `fk_cofficentdetail_job` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`)
-- );

create table `Job`(
id int NOT NULL AUTO_INCREMENT primary key, 
job_name varchar(255) NOT NULL,
breakfast_rate float NOT NULL,
lunch_rate float NOT NULL,
dinner_rate float NOT NULL,
age_min int NOT NULL,
age_max int NOT NULL,
job_type int NOT NULL
);

create table `CofficentDetail`(
id int NOT NULL AUTO_INCREMENT primary key, 
job_id int NOT NULL,
coefficient_id int NOT NULL,
CONSTRAINT `fk_cofficentdetail_job` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`),
CONSTRAINT `fk_cofficentdetail_coefficient` FOREIGN KEY (`coefficient_id`) REFERENCES `coefficientmotion` (`id`)
);

create table `DietaryInfo`(
id int NOT NULL AUTO_INCREMENT primary key,
user_id int NOT NULL,
job_id int NOT NULL,
meal_id int NOT NULL,
food_id int NOT NULL,
weight float NOT NULL,
height float NOT NULL,
age int NOT NULL,
calories_need float NOT NULL,
fat_need float NOT NULL,
protein_need float NOT NULL,
carb_need float NOT NULL,
diet_date datetime NOT NULL,
mass float not null,
CONSTRAINT `fk_diet_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
CONSTRAINT `fk_diet_job` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`),
CONSTRAINT `fk_diet_meal` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`),
CONSTRAINT `fk_diet_food` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
);
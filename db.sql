

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;




CREATE DATABASE webtech21project WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE webtech21project OWNER TO lukas;

\connect webtech21project

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


CREATE TABLE public.categories (
    cetegoryid smallint NOT NULL,
    title text,
    description text
);


ALTER TABLE public.categories OWNER TO lukas;


CREATE TABLE public.items (
    itemid bigint NOT NULL,
    title character varying,
    "desc" text,
    price double precision,
    categories smallint[],
    allergens character(1)[],
    status character varying,
    likescount bigint,
    dislikescount bigint
);


ALTER TABLE public.items OWNER TO lukas;



CREATE TABLE public.orders (
    orderid bigint NOT NULL,
    status character varying,
    orderdate date,
    tableid smallint NOT NULL,
    paymentreference character varying,
    paymenttoken character varying,
    totalamount double precision,
    ordereditems jsonb
);


ALTER TABLE public.orders OWNER TO lukas;


CREATE TABLE public.reviews (
    reviewid bigint NOT NULL,
    username character varying,
    date date,
    description text
);


ALTER TABLE public.reviews OWNER TO lukas;



INSERT INTO public.categories (cetegoryid, title, description) VALUES (1, 'Pizza', 'Traditional italien pizza made with love from our professianal pizza baker Claudio. All pizzas are prepared in a traditional stone oven.');
INSERT INTO public.categories (cetegoryid, title, description) VALUES (2, 'Pasta', 'All pasta is 100% hand-made. This is the reason, why we are opened only at night. All over the day, we prepare fresh pasta!');
INSERT INTO public.categories (cetegoryid, title, description) VALUES (3, 'Weekly Specials', 'Explore new dishes and promotions every week!');




INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (2, 'Marinara', 'Like the margherita pizza, pizza marinara also originated in Naples. This simple pizza is topped with plain marinara sauce, oregano and garlic. Essentially, it is very similar to the margherita pizza but lacks the cheese and basil. Apparently, back in the 1700s and 1800s, pizza marinara was popular with poor sailors and made on their ships as the ingredients used to make it were easily preserved.', 7.8, '{1}', '{A,B,C,D,E,F}', 'available', 9, 0);
INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (9, 'Bucatini all "Amatriciana"', 'Named for the town of Amatrice, located about an hour northeast of Roma, this simple dish combines sweet and tangy tomato sauce with rich guanciale (cured pork jowl) and sharp Pecorino Romano DOP cheese, with a spicy kick from peperoncini, or dried chili flakes. The best part? The hollow bucatini make each bite extra saucy.
	   ', 10.8, '{2}', '{A,B,C,D,E}', 'available', 5, 1);
INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (1, 'Pizza Margherita', 'Everyone knows and loves it – pizza margherita is a universally praised pizza for a reason. Originating in Naples, the margherita pizza has an interesting history supposedly rooted in a visit by Queen Margherita to Naples. The iconic pizza margherita is also known for representing the colours of the Italian flag: red tomato sauce, white mozzarella, and green basil. The combination of these ingredients creates a delicious pizza which has withstood the test of time', 6.8, '{1,3}', '{A,B,C}', 'available', 15, 1);
INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (10, 'Spaghetti alle Vongole', 'Briny clams, white wine, garlic, and peperoncino create a light yet intensely flavorful sauce in this classic Neapolitan spaghetti dish. Look for the freshest clams possible (check with our fishmongers at your local Eataly for a recommendation), and high-quality, bronze-extruded pasta – the coarse texture will help the sauce cling to each strand.
	   ', 10.8, '{2,3}', '{A,B,C,D,E,F,G,H}', 'available', 6, 1);
INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (3, 'PIZZA PUGLIESE', 'Originating in the Italian region of Apulia, pizza pugliese is
	   generally topped with tomato, onion and mozzarella. However, 
	   there are many different variations of the pizza pugliese with some versions using oregano,
	   capers and olives. Some recipes call for different cheeses to be used, such as mozzarella, 
	   provolone and pecorino and some even suggest that the tomato sauce be omitted completely.
	   <br>Basically, you can mix and match the aforementioned ingredients to 
	   suit your own tastes and create your own perfect pizza pugliese.', 7.8, '{1}', '{A,B,C,D,E,F}', 'available', 7, 2);
INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (6, 'Spaghetti Carbonara', 'Spaghetti with pancetta, pecorino, parmesan and eggs.
	   ', 9.8, '{2,3}', '{A,B,C,D,E,F,G}', 'available', 3, 0);
INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (4, 'PIZZA CAPRICCIOSA', 'The pizza capricciosa is one of the most iconic Italian pizzas and can be found in pretty much every pizzeria in Italy. Named for looking ‘capricious’, the abundantly rich pizza capricciosa is generally made up of ham, artichokes, mushrooms and black olives. As with many Italian pizzas, different regions and territories have taken the basic recipe and modified it to make it their own. For example, in Sicily, some prepare the pizza capricciosa with boiled eggs and, to the north, many prepare it with bits of sausage cut into rings.', 8.8, '{1}', '{A,B,C,D,E}', 'available', 25, 5);
INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (8, 'Vesuvio al Ragù di Salsiccia', 'Vesuvio is a short pasta named for the famous volcano of the same name in Campania. The twists and turns of this short pasta make it perfect for catching the chunky bits of tomato and sausage in this Neapolitan-style ragù.
	   ', 10.8, '{2}', '{A,B,C,D,E,F}', 'available', 3, 4);
INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (7, 'Lasagne al Forno Classico', 'Classical lasagne with ground meet sauce
	   ', 7.8, '{2}', '{A,B,C,D,E,F}', 'available', 7, 0);
INSERT INTO public.items (itemid, title, "desc", price, categories, allergens, status, likescount, dislikescount) VALUES (5, 'PIZZA PROSCIUTTO CRUDO E RUCOLA', 'Though it can obviously be enjoyed at any time of the year the prosciutto crudo e rucola pizza is a summertime favourite thanks to its fresh flavours. Made with prosciutto, rocket and your choice of cheese (some of our favourites include parmesan, mozzarella and fior di latte), pizza prosciutto crudo e rucola is a dinner party favourite for being easy to make and universally loved.', 10.8, '{1,3}', '{A,B,C,D,E,F,G,H}', 'available', 9, 1);




INSERT INTO public.orders (orderid, status, orderdate, tableid, paymentreference, paymenttoken, totalamount, ordereditems) VALUES (1, 'ordered', '2022-01-20', 1, 'Paypal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDI2NzY4MzYsImV4cCI6MTY0MjY4MDQzNn0.Cf_0lIOOdVKRMOR0NR07L1G5jzsDbvDHwByPQktn4Os', 30.2, '[{"amount": 1, "itemid": 2, "status": "ordered", "gotrated": false}, {"amount": 2, "itemid": 7, "status": "ordered", "gotrated": false}, {"amount": 1, "itemid": 1, "status": "ordered", "gotrated": false}]');
INSERT INTO public.orders (orderid, status, orderdate, tableid, paymentreference, paymenttoken, totalamount, ordereditems) VALUES (2, 'ordered', '2022-01-20', 1, 'VISA', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDI2NzY4MzYsImV4cCI6MTY0MjY4MDQzNn0.Cf_0lIOOdVKRMOR0NR07L1G5jzsDbvDHwByPQktn4Os', 28.4, '[{"amount": 2, "itemid": 4, "status": "ordered", "gotrated": false}, {"amount": 1, "itemid": 8, "status": "ordered", "gotrated": false}]');
INSERT INTO public.orders (orderid, status, orderdate, tableid, paymentreference, paymenttoken, totalamount, ordereditems) VALUES (3, 'ordered', '2022-01-20', 1, 'Klarna', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDI2ODY4MjMsImV4cCI6MTY0MjY5MDQyM30.vrCkhh9OF4bbRSjCTH5hB3VC0ICY6rz_u_Sm4rU9ydA', 29.4, '[{"amount": 1, "itemid": 3, "status": "ordered", "gotrated": true}, {"amount": 2, "itemid": 8, "status": "ordered", "gotrated": true}]');
INSERT INTO public.orders (orderid, status, orderdate, tableid, paymentreference, paymenttoken, totalamount, ordereditems) VALUES (4, 'ordered', '2022-01-20', 1, 'Maestro', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDI2ODY4MjMsImV4cCI6MTY0MjY5MDQyM30.vrCkhh9OF4bbRSjCTH5hB3VC0ICY6rz_u_Sm4rU9ydA', 27.4, '[{"amount": 2, "itemid": 4, "status": "ordered", "gotrated": true}, {"amount": 1, "itemid": 6, "status": "ordered", "gotrated": true}]');
INSERT INTO public.orders (orderid, status, orderdate, tableid, paymentreference, paymenttoken, totalamount, ordereditems) VALUES (5, 'ordered', '2022-01-20', 1, 'Maestro', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDI2ODY4MjMsImV4cCI6MTY0MjY5MDQyM30.vrCkhh9OF4bbRSjCTH5hB3VC0ICY6rz_u_Sm4rU9ydA', 28.4, '[{"amount": 1, "itemid": 9, "status": "ordered", "gotrated": true}, {"amount": 2, "itemid": 4, "status": "ordered", "gotrated": true}]');




INSERT INTO public.reviews (reviewid, username, date, description) VALUES (1, 'Max', '2022-01-15', 'Amazing food!');
INSERT INTO public.reviews (reviewid, username, date, description) VALUES (2, 'Jojo', '2022-01-15', 'Pizza Pizza!');








#! /usr/bin/env node

console.log(
  `This script populates the men's and women's clothes categories and some clothes to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"`
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Clothes = require("./models/clothes");

const categories = [];
const clothes = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createClothes();
  await createCategories();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description, clothes) {
  const category = new Category({
    name: name,
    description: description,
    clothes: clothes,
  });
  await category.save();
  categories[index] = category;
}

async function clotheCreate(
  index,
  name,
  description,
  price,
  stock_number,
  image_path,
  type
) {
  const clothe = new Clothes({
    name: name,
    description: description,
    price: price,
    stock_number: stock_number,
    image_path: image_path,
    type: type,
  });

  await clothe.save();
  clothes[index] = clothe;
}

async function createClothes() {
  console.log("Adding clothes");
  await Promise.all([
    clotheCreate(
      0,
      "Men's clothe #1",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      19.999,
      23,
      "mens-1.jpeg",
      "men"
    ),
    clotheCreate(
      1,
      "Men's clothe #2",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      29.99,
      14,
      "mens-2.jpeg",
      "men"
    ),
    clotheCreate(
      2,
      "Men's clothe #3",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      22.99,
      27,
      "mens-3.jpeg",
      "men"
    ),
    clotheCreate(
      3,
      "Men's clothe #4",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      24.99,
      29,
      "mens-4.jpeg",
      "men"
    ),
    clotheCreate(
      4,
      "Men's clothe #5",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      21.99,
      10,
      "mens-5.jpeg",
      "men"
    ),
    clotheCreate(
      5,
      "Women's clothe #1",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      34.99,
      31,
      "womens-1.jpeg",
      "women"
    ),
    clotheCreate(
      6,
      "Women's clothe #2",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      25.99,
      22,
      "womens-2.jpeg",
      "women"
    ),
    clotheCreate(
      7,
      "Women's clothe #3",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      54.99,
      8,
      "womens-3.jpeg",
      "women"
    ),
    clotheCreate(
      8,
      "Women's clothe #4",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      45.99,
      2,
      "womens-4.jpeg",
      "women"
    ),
    clotheCreate(
      9,
      "Women's clothe #5",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      27.99,
      54,
      "womens-5.jpeg",
      "women"
    ),
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Men's clothing",
      "Quality and affordable clothes for men",
      [clothes[0], clothes[1], clothes[2], clothes[3], clothes[4]]
    ),
    categoryCreate(
      1,
      "Women's clothing",
      "Quality and affordable clothes for women",
      [clothes[5], clothes[6], clothes[7], clothes[8], clothes[9]]
    ),
  ]);
}

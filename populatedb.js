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
  type
) {
  const clothe = new Clothes({
    name: name,
    description: description,
    price: price,
    stock_number: stock_number,
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
      "men"
    ),
    clotheCreate(
      1,
      "Men's clothe #2",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      29.99,
      14,
      "men"
    ),
    clotheCreate(
      2,
      "Men's clothe #3",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      22.99,
      27,
      "men"
    ),
    clotheCreate(
      3,
      "Men's clothe #4",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      24.99,
      29,
      "men"
    ),
    clotheCreate(
      4,
      "Men's clothe #5",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      21.99,
      10,
      "men"
    ),
    clotheCreate(
      5,
      "Women's clothe #1",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      34.99,
      31,
      "women"
    ),
    clotheCreate(
      6,
      "Women's clothe #2",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      25.99,
      22,
      "women"
    ),
    clotheCreate(
      7,
      "Women's clothe #3",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      54.99,
      8,
      "women"
    ),
    clotheCreate(
      8,
      "Women's clothe #4",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      45.99,
      2,
      "women"
    ),
    clotheCreate(
      9,
      "Women's clothe #5",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac arcu id mauris tempor sollicitudin at consequat libero. Aliquam aliquet.",
      27.99,
      54,
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

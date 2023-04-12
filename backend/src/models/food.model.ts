import { Schema, model } from "mongoose";

/* The `export interface IFood` is defining the structure of a food item object in TypeScript. It
specifies the properties of a food item, such as its `id`, `name`, `description`, `price`, `tags`,
`imgUrl`, `favorite`, `stars`, and `waitTime`. This interface can be used to ensure that objects
passed around in the code conform to this structure and have all the required properties. */
export interface IFood {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  imgUrl: string;
  favorite: boolean;
  stars: number;
  waitTime: string;
}

/* This code defines a Mongoose schema for a food item in a restaurant menu. The schema specifies the
properties of a food item, such as its name, description, price, tags, image URL, and other
attributes. It also includes options for the schema, such as enabling virtuals and timestamps. The
schema is exported as `FoodSchema` for use in creating a Mongoose model for the "Food" collection in
the database. */
export const FoodSchema = new Schema<IFood>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    imgUrl: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    stars: { type: Number, required: true },
    waitTime: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

/*with food model we can create, read, update, delete, and find food items in the database*/
/* This code exports a Mongoose model for the "Food" collection in the database. It uses the `model`
function from Mongoose to create the model, which takes two arguments: the name of the model in the
database ("Food"), and the schema for the model (`FoodSchema`). The model is then exported as
`FoodModel` for use in other parts of the application. */
export const FoodModel = model<IFood>(
  /*name of model in db*/ "Food",
  FoodSchema
);

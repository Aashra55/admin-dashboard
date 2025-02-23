import sanityClient from "./sanity.client";

export const GetProductData = async () => {
  return sanityClient.fetch(
    `*[_type == "product"]{_id, name, price, description, image}`
  );
}

export const GetUserData = async () => {
  return sanityClient.fetch(`*[_type == "user"]{_id, name, email}`);
};



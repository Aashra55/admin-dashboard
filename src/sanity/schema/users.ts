import { defineType, defineField } from "sanity";

const userSchema = defineType({
    name: "user",
    title: "Users",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
        }),
    ],
});

export default userSchema;



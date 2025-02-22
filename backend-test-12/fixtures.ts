import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import Photo from "./models/Photo";

const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try{
        await db.dropCollection('users');
        await db.dropCollection('photos');
    }catch(err){
        console.log(err);
    }

    const  [user1, user2] = await User.create(
        {
            email: 'user1@gmail.com',
            password: '123',
            token: randomUUID(),
            role: 'admin',
            displayName: 'Jane',
            avatar: 'fixtures/avatar/avatar1.jpg'
        },
        {
            email: 'user2@gmail.com',
            password: '12345',
            token: randomUUID(),
            role: 'user',
            displayName: 'John',
            avatar: 'fixtures/avatar/avatar2.jpg'
        }
    )

    await Photo.create([
        {
            user: user1._id,
            title: 'Doll pink',
            image: "fixtures/photo/dollPink.jpg",
        },
        {
            user: user1._id,
            title: 'Bunny',
            image: "fixtures/photo/bunny.jpg",
        },
        {
            user: user1._id,
            title: "Lady",
            image: "fixtures/photo/lady.jpg",
        },
        {
            user: user1._id,
            title: 'Sphinx',
            image: "fixtures/photo/sphinx.jpg",
        },
        {
            user: user1._id,
            title: 'Cat',
            image: "fixtures/photo/cat.jpg",
        },
        {
            user: user2._id,
            title: 'Stich',
            image: "fixtures/photo/stich.jpg",
        },
        {
            user: user2._id,
            title: 'Panda',
            image: "fixtures/photo/panda.jpg",
        },
        {
            user: user2._id,
            title: 'Shrek',
            image: "fixtures/photo/shrek.jpg",
        },
        {
            user: user2._id,
            title: 'Bob',
            image: "fixtures/photo/bob.jpg",
        },
        {
            user: user2._id,
            title: 'Monkey',
            image: "fixtures/photo/monkey.jpg",
        },
        {
            user: user2._id,
            title: 'Minions',
            image: "fixtures/photo/minions.jpg",
        }
    ]);

    await db.close()

}

run().catch(console.error)
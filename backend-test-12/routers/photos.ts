import express from "express";
import Photo from "../models/Photo";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

const photosRouter = express.Router();

photosRouter.post('/', auth, imagesUpload.single("image"), async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const user = reqWithAuth.user

    if (!user) {
        res.status(400).send({error: 'User not found'});
        return;
    }

    try{
        const newPhoto = new Photo({
            user: user._id,
            title: req.body.title,
            image: req.file ? req.file.filename : null,
        })
        await newPhoto.save();
        res.send(newPhoto);

    }catch (e){
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e)
    }
});

photosRouter.get("/", async (req, res, next) => {
    try{
        const photos = await Photo.find().populate('user')
        res.send(photos);
    }catch(e){
        next(e);
    }
})

photosRouter.get('/users/:id', async (req, res, next) => {
    try{
        if(!req.params.id){
            res.status(400).send({error: "Id is missing"});
        }
        const photoUser = await Photo.find({user: req.params.id}).populate('user');
        res.send(photoUser);
    }catch(e){
        next(e);
    }
})

photosRouter.delete('/:id',auth, async (req, res, next) => {
    try{
        if(!req.params.id){
            res.status(400).send({error: "Id is required"});
        }

        const photos = await Photo.findById(req.params.id);

        if(photos){
            await Photo.findByIdAndDelete(req.params.id);
            res.send({message: 'Photo was deleted successfully', photos: photos});
        }

    }catch(e){
        next(e);
    }
})

export default photosRouter;